-- Migration number: 0001 	 2026-05-15T19:44:20.529Z
CREATE TABLE log (
  id                   TEXT    PRIMARY KEY,
  contact              TEXT    NOT NULL,
  message              TEXT    NOT NULL,
  channel              TEXT    NOT NULL CHECK (channel IN ('red','green')),
  source               TEXT,
  rate_limit_decision  TEXT    CHECK (rate_limit_decision IN ('accept','drop')),
  rate_limit_violation TEXT    CHECK (rate_limit_violation IN ('none','hour','day','lifetime','kv_error')),
  ai_decision          TEXT    CHECK (ai_decision IN ('accept','drop')),
  ai_violation         TEXT    CHECK (ai_violation IN ('none','fun','nonsense','spam')),
  adapter              TEXT,
  result               TEXT    CHECK (result IN ('dropped','delivered','failed')),
  result_reason        TEXT,
  created_at           INTEGER NOT NULL DEFAULT (unixepoch())
) STRICT;

CREATE INDEX log_created_at_idx ON log(created_at);
CREATE INDEX log_source_idx     ON log(source) WHERE source IS NOT NULL;
