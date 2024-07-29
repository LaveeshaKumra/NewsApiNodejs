const axios = require('axios');

const baseUrl = 'https://newsapi.org/v2/everything';
const apiKey = process.env.API_KEY;

exports.getNews = async (req, res) => {
    console.log("hey"+req.user.preferences)
    const preferences = req.user.preferences;
    fetchAllPreferencesNews(preferences).then(newsObject => {
        const resnewsObject=(JSON.stringify(newsObject, null, 2));
        res.json({ news: resnewsObject });
    });
}



// Base URL for NewsAPI

// Function to fetch news for a given query
async function fetchNews(query) {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        q: query,
        apiKey: apiKey,
        language: 'en', // Optional: Specify the language
        sortBy: 'publishedAt', // Optional: Sort by date
      },
    });

    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// Fetch and display news for each preference
async function fetchAllPreferencesNews(preferences) {
    const newsObject = {};
  
    for (const preference of preferences) {
      const articles = await fetchNews(preference);
      newsObject[preference] = articles.map(article => ({
        title: article.title,
        url: article.url,
        description: article.description,
        publishedAt: article.publishedAt,
      }));
    }
  
    return newsObject;
  }
  
  


