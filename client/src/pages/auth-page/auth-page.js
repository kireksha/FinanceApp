import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import style from "./auth-page.module.css";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("http://localhost:5000/api/", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        console.log("Пользователь не авторизован");
      }
    };
    checkAuth();
  }, []);

  const switchModeHandler = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Неверный формат email")
      .required("Email обязателен"),
    password: Yup.string()
      .min(6, "Пароль должен быть не менее 6 символов")
      .required("Пароль обязателен"),
    confirmPassword: isLogin
      ? Yup.string()
      : Yup.string()
          .oneOf([Yup.ref("password"), null], "Пароли не совпадают")
          .required("Подтверждение пароля обязательно"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    setServerError("");

    try {
      let response;
      if (isLogin) {
        response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
          credentials: "include",
        });
      } else {
        response = await fetch("http://localhost:5000/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
          credentials: "include",
        });
      }
      if (response.ok) {
        navigate("/");
      } else {
        const data = await response.json();
        setServerError(data.message || "Что-то пошло не так");
      }

      setSubmitting(false);
    } catch (error) {
      setServerError(error.message || "Ошибка сервера");
      setSubmitting(false);
    }
  };

  return (
    <div className={style["auth-container"]}>
      <h1>{isLogin ? "Вход" : "Регистрация"}</h1>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={style["auth-form"]}>
            {serverError && (
              <div className={style["auth-form__error-message"]}>
                {serverError}
              </div>
            )}
            <div className={style["auth-form__form-group"]}>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className={style["auth-form__input-field"]}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={style["auth-form__error-message"]}
              />
            </div>

            <div className={style["auth-form__form-group"]}>
              <Field
                type="password"
                name="password"
                placeholder="Пароль"
                className={style["auth-form__input-field"]}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={style["auth-form__error-message"]}
              />
            </div>

            {!isLogin && (
              <div className={style["auth-form__form-group"]}>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Повторите пароль"
                  className={style["auth-form__input-field"]}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={style["auth-form__error-message"]}
                />
              </div>
            )}
            <button
              type="submit"
              className={
                isSubmitting
                  ? style["auth-form__loading-button"]
                  : style["auth-form__submit-button"]
              }
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Загрузка..."
                : isLogin
                  ? "Войти"
                  : "Создать аккаунт"}
            </button>

            <button
              type="button"
              onClick={switchModeHandler}
              className={style["auth-form__switch-button"]}
            >
              Перейти к {isLogin ? "регистрации" : "авторизации"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
