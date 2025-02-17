export type StructuredError = {
  HttpStatusCode: number; // https://http.cat in case you forget which number to use
  error_code: string; // put the thing that fucked up and the line number you declare this value on so we can ctrl+f later
  title: string; // Never call it an error, say "Issue" or "Alert"
  user_id: string | null;
  request_id: string | null;
  message: string; // This gets displayed directly to the user. They probably won't read it, but be verbose because they'll send us a screenshot of the issue
  next_steps: string; // Explain to the user what to do. This will be rendered prominently and they will probably read it.
  origin: string; // put the file name here
  route_to_resolve_issue: string | null; // if there's a front end resource that can fix this, put the relative path here
};
