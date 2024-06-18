enum MSG {
  CARD_CREATED = 'Карточка была успешно создана',
  CARD_DELETED = 'Карточка была успешно удалена',
  CARD_NAME_CANNOT_DUPLICATE = 'Имя карточки не должно повторяться',
  CARD_NOT_FOUND = 'Карточка не найдена',
  CARD_UPDATED = 'Карточка была успешно обновлена',
  CARDS_DELETED = 'Карточки были успешно удалены',

  COLUMN_CREATED = 'Колонка была успешно создана',
  COLUMN_DELETED = 'Колонка была успешно удалена',
  COLUMN_NOT_FOUND = 'Колонка не найдена',
  COLUMN_UPDATED = 'Колонка была успешно обновлена',
  COLUMNS_DELETED = 'Колонки были успешно удалены',

  COMMENT_CREATED = 'Комментарий был успешно создан',
  COMMENT_DELETED = 'Комментарий был успешно удален',
  COMMENT_NOT_FOUND = 'Комментарий не найден',
  COMMENT_UPDATED = 'Комментарий был успешно обновлен',
  COMMENTS_DELETED = 'Комментарии были удалены',

  DUPLICATE_CARD_NAME = 'Имя карточки не может повторяться',
  DUPLICATE_COLUMN_NAME = 'Имя колонки не может повторяться',
  DUPLICATE_COMMENT = 'Комментарий не должен повторяться',

  USER_ALREADY_EXISTS = 'Пользователь уже существует',
  USER_NOT_FOUND = 'Пользователь не найден',
  USER_REGISTERED = 'Пользователь был успешно зарегистрирован',
  USER_UPDATED = 'Данные пользователя были обновлены',

  SOMETHING_WENT_WRONG = 'Что-то пошло не так',
}

export default MSG;
