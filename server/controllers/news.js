const NewsService = require('../services/newsService');
const Service = new NewsService();

module.exports.create = async (req, res) => {
  try {
    const { text, theme, userId } = JSON.parse(req.body);
    if (!text || !theme) {
      return res.status(400).json({ error: 'заполните все поля' });
    }
    const created = await Service.createNews({ text, theme, id: userId });
    if(!created.status) {
        return res.status(401).json({ error: response.message });
    }
    const news = await getNews()
    res.json(news)
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
module.exports.getNews = async (req, res) => {
    try {
       const news = await getNews()
       res.json(news)
    } catch (e) {
      res.status(400).json({ error: e });
    }
  };

  module.exports.delete = async (req, res) => {
    try {
        const response = await Service.deleteNews(req.params.id);
        if(!response.status) {
            return res.status(401).json({ error: response.message });
          }
          const news = await getNews()
          res.json(news)  
    } catch (e) {
      res.status(400).json({ error: e });
    }
  };

  module.exports.update = async (req, res) => {
    try {
        const { text, theme} = JSON.parse(req.body);
        if (!text || !theme) {
        return res.status(400).json({ error: 'заполните все поля' });
        }
         const response = await Service.updateNews({text, theme},req.params.id);
        if(!response.status) {
            return res.status(401).json({ error: response.message });
          }
          const news = await getNews()
          res.json(news)   
    } catch (e) {
      res.status(400).json({ error: e });
    }
  };
const getNews = async (res) => {
    const response = await Service.getNews();
    if(!response.status) {
        return res.status(401).json({ error: response.message });
      }
    return response.news
}