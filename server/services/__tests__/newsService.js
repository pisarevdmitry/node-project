const News = require('../../models/News');
const NewsService = require('../newsService');
const Service = new NewsService();
const AuthService = require('../authService');
const Auth = new AuthService();

let user
jest.setTimeout(15000);
beforeAll(async () =>{
     user = await Auth.signUp(
        {
          username: 'test user news',
          password: '123',
          firstName: 'Mark'
        },
        {
          chat_create: true,
          chat_read: true,
          chat_update: true,
          chat_delete: true,
          news_create: true,
          news_read: true,
          news_update: true,
          news_delete: true,
          setting_create: true,
          setting_read: true,
          setting_update: true,
          setting_delete: true
        }) 
})

describe('create News', () => {
  it('create succesfull', async () => {
    const response = await Service.createNews({
      id: user.user.id,
      text: 'test news',
      theme: 'test'
    });

    expect(response.status).toBeTruthy();
  });
  it('fail if parametr donst exist in table', async () => {
    const response = await Service.createNews({
      id: user.user.id,
      text: { foo: 'bar' },
      theme: 'test'
    });

    expect(response).toMatchObject({
      status: false,
      message: 'server error'
    });
  });
});

describe('delete News', () => {
  it('delete sucessful', async () => {
    const news = await News.create({
      user_id: user.user.id,
      text: 'test news',
      theme: 'test'
    });

    const response = await Service.deleteNews(news.dataValues.id);
    expect(response.status).toBeTruthy();
  });

  it('fail news donst exist', async () => {
    const response = await Service.deleteNews(147896547);

    expect(response).toMatchObject({
      status: false,
      message: 'server error'
    });
  });
});
describe('update News', () => {
  it('update sucessful', async () => {
    const news = await News.create({
      user_id: user.user.id,
      text: 'test news',
      theme: 'test'
    });
    const response = await Service.updateNews(
      { text: 'updates news' },
      news.dataValues.id
    );
    const updateNews = await News.findById(news.dataValues.id);

    expect(response.status).toBeTruthy();
    expect(updateNews.dataValues.text).toBe('updates news');
  });

  it('fail news donst exist', async () => {
    const response = await Service.updateNews(147896547);

    expect(response).toMatchObject({
      status: false,
      message: 'server error'
    });
  });
});

describe('get News', () => {
    beforeEach(async() => {
        await News.truncate()  
    })
  it('get sucessful', async () => {
    
    await News.create({
      user_id: user.user.id,
      text: 'test news',
      theme: 'test'
    });
    await News.create({
      user_id: user.user.id,
      text: 'test news2',
      theme: 'test1'
    });
    const response = await Service.getNews();
    
    expect(response.status).toBeTruthy();
    expect(response.news.length).toBe(2);
  });

  it('if news doens exist return empty array', async () => {
    const response = await Service.getNews();

    expect(response.status).toBeTruthy();
    expect(response.news.length).toBe(0);
  });
});
