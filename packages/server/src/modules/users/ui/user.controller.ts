import { BaseController } from '@shared/core/baseController';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { newUserDTO } from '../application/useCases/newUser/newUser_DTO';
import { NewUserUseCase } from '../application/useCases/newUser/addNewUser';
import { getRequestIpAddress } from '@utils/getIpAddres';
import { ensure } from '@utils/ensure';
import { getCurrentUserCase } from '../application/useCases/getCurrentUser/getCurrentUser';
import multerConfig from '@shared/helpers/multer';
import multer from 'multer';
import { ChangeProfile } from '../application/useCases/uploadImageProfile/changeProfile';
import cloudinary from '@shared/helpers/cloudinary';
import { v4 } from 'uuid';
import { ForgotMessageService } from '../application/useCases/lostPassword/forgotPassword';
import { ResetPasswordService } from '../application/useCases/lostPassword/resetPassword';
import { ChangePasswordUseCase } from '../application/useCases/changePassword/changeUserPassword';
import { editProfiledDTO } from '../application/useCases/editProfile/editProfile_DTO';
import { EditProfileUseCase } from '../application/useCases/editProfile/editProfile';
@singleton()
export class UserController extends BaseController {
  constructor() {
    super();
    this.path = '/users';
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}`, this.index);
    this.router.get(`${this.path}/me`, this.Me);
    this.router.post(`${this.path}/:id/edit`, this.EditProfile);
    this.router.post(`${this.path}/forgot-password`, this.ForgotPassword);
    this.router.post(
      `${this.path}/:id/change-password`,
      this.ChangePassword,
    );
    this.router.post(`${this.path}/reset-password`, this.ResetPassword);
    this.router.post(`${this.path}/add`, this.addUser);
    this.router.post(
      `${this.path}/:id/change_profile_image`,
      multer(multerConfig).single('image'),
      this.uploadImage,
    );
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private EditProfile = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const token = ensure(
        request.headers.authorization &&
          request.headers.authorization.split(' ')[1],
      );
      const { id } = request.params;
      const dto: editProfiledDTO = request.body;
      const result = await container
        .resolve(EditProfileUseCase)
        .execute({ ...dto, id, token });
      if (result.isLeft()) return next(result.value);
      return response.json({ status: `ok` });
    } catch (error) {
      next(error);
    }
  };
  private ChangePassword = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const token = ensure(
        request.headers.authorization &&
          request.headers.authorization.split(' ')[1],
      );
      const { id } = request.params;
      const { oldPassword, password, confirmPassword } = request.body;
      const result = await container
        .resolve(ChangePasswordUseCase)
        .execute({ id, oldPassword, password, confirmPassword, token });
      if (result.isLeft()) return next(result.value);
      return response.json({ message: `A senha foi alterada com sucesso!` });
    } catch (error) {
      next(error);
    }
  };
  private ForgotPassword = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = request.body;
      const result = await container
        .resolve(ForgotMessageService)
        .execute({ email });
      if (result.value.email === false) return response.status(200).send();
      if (result.value.user === false) return response.status(200).send();
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
  private ResetPassword = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        confirmPassword,
        password,
        token,
        device,
        os,
        ip,
        latitude,
        longitude,
      } = request.body;
      const result = await container.resolve(ResetPasswordService).execute({
        confirmPassword,
        password,
        token,
        device: device,
        os: os,
        ip,
        latitude,
        longitude,
      });
      if (result.value.email === false) return response.status(200).send();
      if (result.value.user === false) return response.status(200).send();
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
  private Me = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const ip = ensure(getRequestIpAddress(request));
      const accessToken = ensure(
        request.headers.authorization &&
          request.headers.authorization.split(' ')[1],
      );
      const result = await container
        .resolve(getCurrentUserCase)
        .execute({ accessToken, ip });
      if (result.isLeft()) return next(result.value);
      return response.json(result.value.getJWTPayload);
    } catch (error) {
      next(error);
    }
  };
  private addUser = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: newUserDTO = request.body;
      const result = await container.resolve(NewUserUseCase).execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
  private uploadImage = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { data } = request.body;
      if (!data) throw new Error(`Invalid Image`);
      const { id } = request.params;
      const ip = ensure(getRequestIpAddress(request));
      const { bytes, public_id, url } = await cloudinary.uploader.upload(data, {
        upload_preset: 'profile_images',
        public_id: v4(),
        format: 'jpg',
      });
      if (!bytes || !public_id || !url)
        throw new Error(`Error to upload image`);
      const result = await container
        .resolve(ChangeProfile)
        .execute({ bytes, public_id, url, id, ip });
      if (result.isLeft()) return next(result.value);
      return response.json({
        message: 'Successfully Updated',
        avatar: public_id,
      });
    } catch (error) {
      next(error);
    }
  };
}
