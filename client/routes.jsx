import React from 'react'
import {mount} from 'react-mounter'
import {Main} from './layouts/Main'
import App from '../imports/ui/App.js';

FlowRouter.route('/', {
	action(){
        mount(
            Main, {
                content: <App/>
            }
        )
    }
})