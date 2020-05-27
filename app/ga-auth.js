exports.authGAServiceAccount = async (Storage) => {
  // Instantiates a client. If you don't specify credentials when constructing
  // the client, the client library will look for credentials in the
  // environment.
  const storage = new Storage();
  try {
    // Makes an authenticated API request.
    const results = await storage.getBuckets();
  } catch (err) {
    console.error('ERROR:', err);
  }
};
