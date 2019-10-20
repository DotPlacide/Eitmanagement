import React from 'react'
import {mount} from 'react-mounter'
import {Main} from './layouts/Main'
import App from '../imports/ui/App.js';

FlowRouter.route('/home', {
	action(){
        mount(
            Main, {
                content: <App/>
            }
        )
    }
})