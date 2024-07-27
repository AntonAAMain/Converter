import cn from "classnames";

import cls from "./ErrorText.module.scss";

export const ErrorText = () => {
  return (
    <div className={cn(cls.container)}>
      Произошла ошибка. Скорей всего просрочился токен {`(`}
    </div>
  );
};
