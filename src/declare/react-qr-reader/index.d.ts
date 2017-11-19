import { Component, EventHandler } from "react";



declare namespace LEVELS {
	export const L = 'L';
	export const M = 'M';
	export const Q = 'Q';
	export const H = 'H';
}
declare type propsKeys = "delay"| "legacyMode" |"facingMode";
declare type LEVELS = LEVELS.L | LEVELS.M | LEVELS.Q | LEVELS.H;


interface IProps  {
	bgColor:string; //'#FFFFFF',
	fgColor:string; //'#000000',
	level: LEVELS; //LEVELS.L,
	size:number;// 256,
}

interface IReaderProps  {
	onScan: EventHandler<any>|() => void ;
	onError: EventHandler<any>|() => void ;
	onLoad: EventHandler<any>|() => void;
	onImageLoad: EventHandler<any> | () => void;
	delay: number|boolean;
	facingMode: 'user'|'environment';
	legacyMode:boolean;
	resolution:number;
	showViewFinder:boolean;
	style: any;
	className: string;
}

declare class Reader extends Component<IReaderProps> {
	
}