import { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import * as envAction from '../../store/actions/env';
import _ from 'lodash';

class Index extends Component {
    static propTypes = {
    
    }

    state = {
    }
    onReady() {
    }
}

export default connect(
    ({ env , ocr_base, menu}) => ({
        env,
        user: env.wxUserInfo
    }),
    (dispatch) => bindActionCreators({
    	
    }, dispatch)
)(Index);
