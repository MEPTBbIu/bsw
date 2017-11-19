export * from "./idletime-actions";
export * from "./profile-actions";
export * from "./app-actions";
import {aacLoadProfile, acUpdateProfile} from "./../fsa-profile";
import {Action} from "typescript-fsa";
import { AppActionT } from "./app-actions";
import {ProfileActionT, ProfileAction} from "./profile-actions";
import {IdleTimeActionT} from "./idletime-actions";
import { IProfileState } from "src/core/store";




export type RootActionT = AppActionT | IdleTimeActionT  | ProfileActionT | Action<IProfileState> ;

