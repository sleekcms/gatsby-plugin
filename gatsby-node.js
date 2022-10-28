const axios = require("axios");

exports.sourceNodes = async (
  { actions: { createNode }, createContentDigest, createNodeId, reporter },
  { xAccessToken }
) => {
  if (!xAccessToken) {
    return reporter.panic(
      "gatsby-source-cms: You must provide your xAccessToken"
    );
  }

  const tokenData = await axios.post(
    "https://dev-app.sleekcms.com/api/data",
    {},
    {
      headers: {
        "X-Access-Token": xAccessToken,
      },
    }
  );
  if (!tokenData.status === 200) {
    throw {
      statusCode: tokenData.status,
      ...tokenData,
    };
  }

  const { status, data } = await axios.get(
    `https://dev-data.sleekcms.com/${tokenData.data.code}`,
    {
      headers: {
        "X-Access-Token": xAccessToken,
      },
    }
  );
  if (!status === 200) {
    throw {
      statusCode: status,
      ...data,
    };
  }
  createNode({
    ...data,
    id: createNodeId(tokenData.data.code),
    parent: null,
    children: [],
    internal: {
      type: 'sleekcmsdata',
      contentDigest: createContentDigest(data),
    },
  });
};
