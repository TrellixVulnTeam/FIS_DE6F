import React from 'react';
import { Form, Input, Button } from 'antd';
import CustomLayout from '../Layout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 
import { addEAO } from '../../actions/eao_programme';

class CustomForm extends React.Component {

  state = {
    redirect : false,

    type_of_prog: 'extension',
    title_of_prog: '',
    your_role: '',
    cross_sec_of_participants: '',
    no_of_participants : null,
    funded_by: '',
    venue: '',
    from_date: '',
    to_date: '',
}

static propTypes = {
  addEAO: PropTypes.func.isRequired
}

onChange = e => {
  this.setState({
    [e.target.name]: e.target.value
  });
  console.log(e.target.value);
}


onSubmit = e => {

  e.preventDefault();
    
  if(this.state.from_date > this.state.to_date)
  {
    alert("Invalid Duration");
  }
  else{

  if(this.props.type === 'add')
  {
  const {type_of_prog,title_of_prog,your_role,cross_sec_of_participants,
    no_of_participants,funded_by,venue,from_date,to_date} = this.state;

  const eao = {type_of_prog,title_of_prog,your_role,cross_sec_of_participants,
    no_of_participants,funded_by,venue,from_date,to_date};
    
    //console.log(eao);
    this.props.addEAO(eao);
    window.open('/eao_programme',"_self");
  }

  else{
    console.log("Error");
  }
  }
}

  render() {
    return (
      <div>
        <CustomLayout>
        <Form onSubmit ={this.onSubmit}>
          <Form.Item label="TYPE OF THE PROGRAMME">
          <select name="type_of_prog" onChange = {this.onChange}>
            <option value="extension">EXTENSION</option>
            <option value="outreach">OUTREACH</option>
          </select></Form.Item>
          <Form.Item label="TITLE OF THE PROGRAMME">
            <Input name = "title_of_prog" placeholder="Enter Title of book" required onChange = {this.onChange} />
          </Form.Item>
          <Form.Item label="YOUR ROLE">
          <Input name = "your_role" placeholder="Enter Author Name" onChange = {this.onChange} />
          </Form.Item>
          <Form.Item label="CROSS SECTION OF PARTICIPANTS">
          <Input name = "cross_sec_of_participants" placeholder="Cross Section of Participants" onChange = {this.onChange} />
          </Form.Item>
          <Form.Item label="NO OF PARTICIPANTS">
          <Input type="number" name = "no_of_participants" placeholder="Enter No of Participants"  onChange = {this.onChange} />
          </Form.Item>
          <Form.Item label="FUNDED BY">
            <Input name = "funded_by" placeholder="" onChange = {this.onChange} />
          </Form.Item>
          <Form.Item label="VENUE">
            <Input name = "venue" placeholder="Enter Venue" onChange = {this.onChange} />
          </Form.Item>
          <Form.Item label="DURATION">
            <label>From</label>{'\u00A0'}{'\u00A0'}
            <input type = "date" required name="from_date" onChange={this.onChange}></input>
            {'\u00A0'}{'\u00A0'}
            <label>To</label>{'\u00A0'}{'\u00A0'}           
            <input type = "date" required name="to_date" onChange={this.onChange}></input>
          </Form.Item><br/>
          <Form.Item>
            <Button type="primary" htmlType = "submit">{this.props.btnText}</Button>
          </Form.Item>
        </Form>
        </CustomLayout>
      </div>
    );
  }
}


export default connect(null,{ addEAO })(CustomForm);