// Requirements...
require('dotenv').config();
const execSync = require('child_process').execSync;
const path = require("path");

/**
 * Creates a path to an executable in the node_modules/.bin directory. Each
 * path segment is joined with the appropriate platform-specific separator as
 * a delimiter.
 * @param {String} cmd The name of the executable.
 * @returns {String} The path to the executable.
 */


// Execute the command...
execSync(`export AWS_ACCESS_KEY_ID=${process.env.AWS_ACCESS_KEY_ID}`)
execSync(`export AWS_SECRET_ACCESS_KEY=${process.env.AWS_SECRET_ACCESS_KEY}`)
execSync(`export AWS_DEFAULT_REGION=ca-central-1`)

// sync files and dirs individually, so we don't overwrite the pdf directory
execSync(`aws s3 sync webDist/_next s3://peterborough-city-council.ca/_next`)
execSync(`aws s3 sync webDist/posts s3://peterborough-city-council.ca/posts`)
execSync(`aws s3 cp webDist/404.html s3://peterborough-city-council.ca/`)
execSync(`aws s3 cp webDist/about.html s3://peterborough-city-council.ca/`)
execSync(`aws s3 cp webDist/favicon.ico s3://peterborough-city-council.ca/`)
execSync(`aws s3 cp webDist/index.html s3://peterborough-city-council.ca/`)
