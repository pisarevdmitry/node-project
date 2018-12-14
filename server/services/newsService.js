const { News } = require('../models');
const DbService = require('./dbService');

class NewsService extends DbService {
  constructor() {
    super(News);
  }

  async createNews(data) {
    try {
      const { text, theme, id } = data;
      const news = await this.create({ theme, text, user_id: id });
      if (news && news.dataValues) {
        return {
          status: true,
          message: null
        };
      }

      return {
        status: false,
        message: 'server error'
      };
    } catch (e) {
      //console.log(e)
      return {
        status: false,
        message: 'server error'
      };
    }
  }

  async deleteNews(id) {
    const deletedNews = await this.delete({
      where: {
        id
      }
    });

    if (deletedNews) {
      return {
        status: true,
        message: null
      };
    }

    return {
      status: false,
      message: 'server error'
    };
  }

  async updateNews(data, id) {
    try {
      const updatedNews = await this.update(data, {
        where: {
          id
        }
      });

      if (updatedNews && updatedNews[0] > 0) {
        return {
          status: true,
          message: null
        };
      }

      return {
        status: false,
        message: 'server error'
      };
    } catch (e) {
      return {
        status: false,
        message: 'server error'
      };
    }
  }

  async getNews() {
    try {
      const news = await this.findAll({
        attributes: ['id', 'theme', 'text', ['updatedAt', 'date']],
        include: 'user',
        order: [['updatedAt', 'DESC']]
      });

      return {
        status: true,
        message: null,
        news: news.map(item => ({
          ...item.dataValues,
          user: { ...item.dataValues.user.dataValues }
        }))
      };
    } catch (e) {
      return {
        status: false,
        message: e
      };
    }
  }
}
module.exports = NewsService;
