## LoftSchool

Большая домашняя работа курса по Node.js - Корпоративная система _"LoftSystem"_.

### Задача

В папке ./dist находится подготовленная frontend-часть проекта, ваша задача - реализовать backend.

1.  Выберите фреймворк - [Express.js](http://expressjs.com/ru/) или [Koa.js](http://koajs.com/).
2.  Выберите базу данных - MongoDB (рекомедуемая ORM - [Mongoose](http://mongoosejs.com/)) или PostgreSQL (рекомедуемая ORM - [Sequelize](http://docs.sequelizejs.com/)).
3.  Подготовьте http-сервер, который на любой get-запрос вернет index.html (маршрутизация выполняется на frontend'e средствами бибилиотеки vue-router).
4.  Реализуйте логику обработки 12 различных запросов:
    - POST-запрос на `/api/saveNewUser` - создание нового пользователя (регистрация). Необходимо вернуть объект созданного пользователя.
    - POST-запрос на `/api/login` - авторизация после пользователького ввода. Необходимо вернуть объект авторизовавшегося пользователя.
    - Автоматический POST-запрос на `/api/authFromToken` - авторизация при наличии токена. Необходимо вернуть объект авторизовавшегося пользователя.
    - PUT-запрос на `/api/updateUser/:id` - обновление информации о пользователе. Необходимо вернуть объект обновленного пользователя.
    - DELETE-запрос на `/api/deleteUser/:id` - удаление пользователя.
    - POST-запрос на `/api/saveUserImage/:id` - сохранение изображения пользователя. Необходимо вернуть объект со свойством path, которое хранит путь до сохраненного изображения.
    - Автоматический GET-запрос на `/api/getNews` - получение списка новостей. Необходимо вернуть список всех новостей из базы данных.
    - POST-запрос на `/api/newNews` - создание новой новости. Необходимо вернуть обновленный список всех новостей из базы данных.
    - PUT-запрос на `/api/updateNews/:id` - обновление существующей новости. Необходимо вернуть обновленный список всех новостей из базы данных.
    - DELETE-запрос на `/api/deleteNews/:id` - удаление существующей новости. Необходимо вернуть обновленный список всех новостей из базы данных.
    - Автоматический GET-запрос на `/api/getUsers` - получение списка пользователей. Необходимо вернуть список всех пользоватлей из базы данных.
    - PUT-запрос на `/api/updateUserPermission/:id` - обновление существующей записи о разрешениях конкретного пользователя.

> (Более подробную информацию о url, дополнительных параметрах и передаваемых данных запроса вы можете получить через средства разработчика при взаимодействии с интерфейсом).

5.  Реализуйте логику взаимодействия frontend и backend частей между собой с помощью socket. Необходимо для реализации чата. У вас должен быть хеш-объект, в который вы запишите все активные подключения в формате:

```
{ #id: {
  username: #username,
  id: #id
  },
  ...
}
```

Ваше socket-подключение должно обрабатывать следующие события:

- `connection`, инициируется при подключении пользователя. Необходимо создать объект пользователя и сохранить в нем id сокета и имя пользователя, как свойства, обновить общий объект, отправить его только что подключившемуся пользователю (с помощью события `all users`) и разослать всем подключенным сокетам объект нового пользователя (с помощью события `new user`).
- `chat message`, инициируется при отправке одним из пользователей сообщения другому. Нужно передать пользователю-получателю в параметрах текст сообщения и id отправителя с помощью события `chat message`.
- `disconnect`, инициируется при отключении пользователя. Нужно передать всем подключенным пользователям id отключившегося пользователя (с помощью события `delete user`), и удалить пользователя из объекта всех подключенных пользователей.

6.  Подготовьте окружение и запустите проект на выбранном вами хостинге (например, [heroku](https://www.heroku.com/)).

**Дополнительное задание 1**: обеспечьте при необходимости сжатие картинок, загружаемых пользователями, и их обрезку до квадратных пропорций (для этого можно использовать [jimp](https://github.com/oliver-moran/jimp)).
**Дополнительное задание 2**: обеспечьте возможность работы приложения в 2 режимах - `development` и `producton`. В `development` режиме приложение должно быть подключено к локальной базе данных, в то время как в `producton` режиме - к удаленной, которая и будет использоваться при работе на хостинге.
