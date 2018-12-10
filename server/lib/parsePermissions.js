module.exports = permission => {
    console.log(permission)
  return {
    chat_create: permission.chat && permission.chat.C,
    chat_read: permission.chat && permission.chat.R,
    chat_update: permission.chat && permission.chat.U,
    chat_delete: permission.chat && permission.chat.D,
    news_create: permission.news && permission.news.C,
    news_read: permission.news && permission.news.R,
    news_update: permission.news && permission.news.U,
    news_delete: permission.news && permission.news.D,
    setting_create: permission.setting && permission.setting.C,
    setting_read: permission.setting && permission.setting.R,
    setting_update: permission.setting && permission.setting.U,
    setting_delete: permission.setting && permission.setting.D
  };
};
