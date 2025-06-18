export function formatErrorMessage(error: any) {
  if ("error" in error) {
    return error.error;
  } else {
    return "Error";
  }
}
