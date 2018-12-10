module.exports = permissions  => {
    return {
        chat:{
            C: permissions.chat_create,
            D: permissions.chat_delete,
            R: permissions.chat_read,
            U: permissions.chat_update,
        },
        news:{
            C: permissions.news_create,
            D: permissions.news_delete,
            R: permissions.news_read,
            U: permissions.news_update,
        },
        setting:{
            C: permissions.setting_create,
            D: permissions.setting_delete,
            R: permissions.setting_read,
            U: permissions.setting_update,
        }
      }
}