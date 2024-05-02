import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {checkUserAsync, selectError} from '../authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  // console.log(errors);

  return (
    <div className="login_ctr">
      <div>
        <h2>Login Account</h2>
      </div>

      <div>
        <form
          noValidate
          onSubmit={handleSubmit((data) => {
            dispatch(
              checkUserAsync({email: data.email, password: data.password})
            );
          })}
          className="space-y-6"
          action="#"
          method="POST">
          <div>
            <div>
              <input
                placeholder="E-Mail"
                id="email"
                {...register('email', {
                  required: 'email is required',
                  pattern: {
                    message: 'email not valid',
                  },
                })}
                type="email"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="password_ctr">
            <div>
              <p className="forget_password cursor-not-allowed">
                Forgot password?
              </p>
            </div>
            <div>
              <input
                placeholder="Password"
                id="password"
                {...register('password', {
                  required: 'password is required',
                })}
                type="password"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            {error && <p className="text-red-500">{error.message}</p>}
          </div>

          <div className="login_ctr-btn">
            <Link className="signup_btn btn" to="/signup">
              Signup
            </Link>
            <button className="login_btn btn" type="submit">
              Login
            </button>
          </div>
          <span className="auth_note">
            “You can sign up with a temporary account to continue. All products
            listed are dummy”
          </span>
        </form>
      </div>
    </div>
  );
}
