import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email adresi giriniz")
    .required("Email zorunludur"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Şifre güçlü olmalı"
    )
    .required("Şifre zorunluduur"),
  terms: yup.boolean().oneOf([true], "Şartları kabul etmelisiniz"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/success");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Şifre:</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <input type="checkbox" {...register("terms")} />
        <label>Şartları kabul ediyorum</label>
        {errors.terms && <p>{errors.terms.message}</p>}
      </div>
      <button type="submit" disabled={Object.keys(errors).length > 0}>
        Giriş Yap
      </button>
    </form>
  );
};

export default Login;
