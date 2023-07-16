import { ApiError } from '../../../error/ApiError';
import { IUser } from '../../modules/users/users.interface';
import { User } from '../../modules/users/users.model';

const signup = async (payload: IUser) => {
  console.log('duplicate', payload);
  const user = await User.find(payload);
  const result = await User.create(payload);

  if (!result) {
    throw new ApiError(404, 'signup request failed!');
  }
  return result;
};

// // login
// const loginUser = async (payload: IUserAuth): Promise<IJWTResponse> => {
//   const { email, password } = payload;

//   const isUserExit = await User.findOne({ email });

//   if (!isUserExit) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found!');
//   }

//   if (
//     isUserExit?.password &&
//     !(await User.isPasswordMatch(password, isUserExit.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password not match!');
//   }

//   const { _id: id, role } = isUserExit;

//   const accessToken = jwtHelpers.createToken(
//     { id, role },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   );
//   const refreshToken = jwtHelpers.createToken(
//     { id, role },
//     config.jwt.refresh_secret as Secret,
//     config.jwt.refresh_expires_in as string
//   );

//   return {
//     accessToken,
//     refreshToken,
//   };
// };

export const AuthService = {
  signup,
  // loginUser,
};
