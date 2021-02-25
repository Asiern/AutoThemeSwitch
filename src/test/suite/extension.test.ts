import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import {equals,isBetween,ITime} from "../../time"; 
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {

	test("time equals",()=>{
		let t1:ITime = {
			hours:20,
			minutes:12,
			seconds:0,
		}; 
		let t2:ITime = {
			hours:0,
			minutes:12,
			seconds:0,
		}; 
		assert.strictEqual(true,equals(t1,t1));
		assert.strictEqual(false,equals(t2,t1));

	});

	test("is Between",()=>{
		let t1:ITime = {
			hours:20,
			minutes:12,
			seconds:0,
		}; 
		let t2:ITime = {
			hours:0,
			minutes:12,
			seconds:0,
		}; 
		let t3:ITime = {
			hours:22,
			minutes:29,
			seconds:0,
		}; 
		assert.strictEqual(true,isBetween(t2,t3,t1));
		assert.strictEqual(false,isBetween(t1,t3,t2));

	});
});
