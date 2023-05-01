import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';


export const client = createClient({
  projectId: "d3tizgxu",
  dataset: 'production',
  apiVersion: '2023-01-01',
  token: 'skJQ5wOWu3WkwHA3V9gAHcKx3uymnUMciWNrWY3zyNSBNqBeZykPNrobXtPa8LdX5C14LU4aeSGG2zoPUgM1yfnBpaVqVP5dTeERb85WVXcC9UxCHe1p3DiQwesdLjNvXSWB231LoryzDC0divG0Xsti2ZplbA4t26pE6rPmXSgTCK5S3dTy',
  useCdn: process.env.NODE_ENV === 'production'
});

const builder = imageUrlBuilder(client);

export const urlFor = (source:string) => builder.image(source);
