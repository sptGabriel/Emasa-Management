import {APIErrorMessage} from './APIErrorMessage'
import {Either} from '../../core/either'

export type APIResponse<T> = Either<APIErrorMessage, T>
