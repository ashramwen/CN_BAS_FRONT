import * as Stomp from 'stompjs';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { RootState } from './../redux/index';
import { StateSelectors } from './../redux/selectors';
import { StompThing } from './../models/stomp-thing.interface';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { TokenState } from './../redux/token/reducer';

/** possible states for the STOMP service */
export enum StompState {
  CLOSED,
  TRYING,
  CONNECTED,
  DISCONNECTING
};

/**
 * Angular2 STOMP Service using stomp.js
 *
 * @description This service handles subscribing to a
 * message queue using the stomp.js library, and returns
 * values via the ES6 Observable specification for
 * asynchronous value streaming by wiring the STOMP
 * messages into a Subject observable.
 */
@Injectable()
export class StompService {

  /* Service parameters */

  // State of the STOMPService
  private state: BehaviorSubject<StompState>;

  // Publishes new messages to Observers
  private messages: Subject<StompThing>;

  // STOMP Client from stomp.js
  private client: Stomp.Client;

  // Timer
  private timer: number;

  private subscription: any[];
  private queue: any[];

  constructor(
    private store: Store<RootState>
  ) {
    this.messages = new Subject<StompThing>();
    this.state = new BehaviorSubject<StompState>(StompState.CLOSED);
    this.subscription = [];
    this.queue = [];

    this.init();
  }

  /**
   * Init STOMP Client
   *
   * @returns {Promise<{}>}
   *
   * @memberOf StompService
   */
  public init(): Promise<{}> {
    if (this.state.getValue() !== StompState.CLOSED) {
      throw Error('STOMP Already running!');
    }

    this.client = Stomp.client(BASE_CONFIG.wsUrl);

    this.client.heartbeat.outgoing = 20000;
    this.client.heartbeat.incoming = 0;
    this.client.debug = null;

    return this.try_connect();
  }

  /**
   * Disconnect the STOMP client and clean up
   *
   *
   * @memberOf StompService
   */
  public disconnect(): void {

    // Notify observers that we are disconnecting!
    this.state.next(StompState.DISCONNECTING);

    // Abort reconnecting if in progress
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    // Disconnect if connected. Callback will set CLOSED state
    if (this.client && this.client.connected) {
      this.client.disconnect(() => this.state.next(StompState.CLOSED));
    }
  }

  /**
   * Send a message to a destination
   *
   * @param {string} destination
   * @param {string} message
   *
   * @memberOf StompService
   */
  public send(destination: string, message: string): void {
    this.client.send(destination, {}, message);
  }

  /**
   * Subscribe to a destination
   *
   * @param {string} destination
   * @returns {*}
   *
   * @memberOf StompService
   */
  public subscribe(destination: string): void {
    if (this.state.getValue() !== StompState.CONNECTED) {
      this.queue.push(destination);
    } else {
      let subscription = this.client.subscribe(
        destination,
        this.on_message.bind(this),
        { ack: 'auto' }
      );
      this.subscription.push(subscription);
    }
  }

  /**
   * unsubscribe all subscriptions
   *
   *
   * @memberOf StompService
   */
  public unsubscribe(): any {
    this.subscription.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.messages.unsubscribe();
  }

  /**
   * Receive message
   *
   * @param {*} callback
   *
   * @memberOf StompService
   */
  public onMessage(callback: any): void {
    this.messages.subscribe(callback);
  }

  /**
   * Perform connection to STOMP broker
   *
   * @returns {Promise<{}>}
   *
   * @memberOf StompService
   */
  private try_connect(): any {

    if (this.state.getValue() !== StompState.CLOSED) {
      throw Error('STOMP: Can\'t try_connect if not CLOSED!');
    }

    return this.store.select(StateSelectors.token)
      .map((tokenState: TokenState) => tokenState.token.accessToken)
      .subscribe((accessToken: string) => {
        // Attempt connection, passing in a callback
        this.client.connect({
          Authorization: `Bearer ${accessToken}`
        },
          this.on_connect.bind(this),
          this.on_error.bind(this)
        );

        this.debug('STOMP Connecting...');
        this.state.next(StompState.TRYING);
      });
  }

  /**
   * debug log
   *
   * @param {...any[]} args
   *
   * @memberOf StompService
   */
  private debug(args: any): void {
    console.log(args);
  }

  /**
   * Callback run on successfully connecting to server
   *
   *
   * @memberOf StompService
   */
  private on_connect() {

    this.debug('STOMP Connected.');

    // Indicate our connected state to observers
    this.state.next(StompState.CONNECTED);

    // Clear timer
    this.timer = null;

    if (this.queue.length > 0) {
      this.queue.forEach((q) => this.subscribe(q));
      this.queue = [];
    }
  }

  /**
   * Handle errors from stomp.js
   *
   * @param {(string | Stomp.Message)} error
   *
   * @memberOf StompService
   */
  private on_error(error: string | Stomp.Message) {

    if (typeof error === 'object') {
      error = (error as Stomp.Message).body;
    }

    console.error(`STOMP Error: ${error}`);

    // Check for dropped connection and try reconnecting
    if (error.indexOf('STOMP Lost connection') !== -1) {

      // Reset state indicator
      this.state.next(StompState.CLOSED);

      // Attempt reconnection
      this.debug('STOMP Reconnecting in 5 seconds...');
      this.timer = window.setTimeout(() => {
        this.init();
      }, 5000);
    }
  }

  /**
   * On message RX, notify the Observable with the message object
   *
   * @param {Stomp.Message} message
   *
   * @memberOf StompService
   */
  private on_message(message: Stomp.Message) {
    if (message.body) {
      this.messages.next(JSON.parse(message.body));
    } else {
      console.error('STOMP: Empty message received!');
    }
  }
}
