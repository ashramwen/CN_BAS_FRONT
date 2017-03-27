export interface Shards {
  total: number;
  successful: number;
  failed: number;
}

export interface Hits {
  total: number;
  max_score: number;
  hits: any[];
}

export interface Bucket {
  key_as_string?: Date;
  key: string;
  doc_count: number;
}

export interface ByTarget {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: Bucket[];
}

export interface ByTime {
  buckets: Bucket[];
}

export interface Aggregations {
  byTarget?: ByTarget;
  byTime: ByTime;
}

export interface ESResponse {
  took: number;
  timed_out: boolean;
  _shards: Shards;
  hits: Hits;
  aggregations: Aggregations;
}
