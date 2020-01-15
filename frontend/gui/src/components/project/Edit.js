import React from 'react';
import { Form, Input, Button } from 'antd';
import CustomLayout from '../Layout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 
import { editProject,getProjectbyID,deleteProject } from '../../actions/project';

class ProEdit extends React.Component {

  state = {
    project:{},
    pro:{},
    redirect : false,

    pro_title: '',
    investigator: '',
    co_inves1: '',
    co_inves2: '',
    p_type: '',
    funding_agent: '',
    amt: '',
    pro_type: '',
    durationfrom: '',
    durationto: '',
    department: '',
    co_dep: '',
    co_inst: '',
    pro_abstract: '',
    pdf: '',

    file : null,
    filechanged : false,
    disabled : false,
}

static propTypes = {
  editProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  deleteProject: PropTypes.func.isRequired,
}

delete = (e) => {
  e.preventDefault();
  const id = this.props.match.params.id;
  var conf = window.confirm("Do you want to delete ?");
  if (conf === true) {
    this.props.deleteProject(id);
    window.open('/project',"_self");
  } 
}

dropdowndef = e => {
  this.setState({
    [e.target.name]: e.target.value
  });
}

onChange = e => {
  this.setState({
    [e.target.name]: e.target.value
  });
}

onFileChange = e => {
  this.setState({
    file : e.target.files[0],
    filechanged : true
  });
}

popPDF(url) {
  if(url != null)
  {
  var ref = window.open(url,"thePop","menubar=1,resizable=1,scrollbars=1,status=1,height=1920,width=1020,top=0")
  ref.focus();
  }

  else{
    alert("No PDF Available!!")
  }
}

onSubmit = (e) => {

  e.preventDefault();

  if(this.state.durationfrom > this.state.durationto)
  {
    alert("Invalid Duration");
  }

  else{
  
  this.setState({
      disabled : true
  })

  const id = this.props.match.params.id;
  let form_data = new FormData();
  if(this.state.filechanged == true)
  {
  form_data.append('pdf', this.state.file, this.state.file.name);
  }
  form_data.append('pro_title', this.state.pro_title);
  form_data.append('pro_type', this.state.pro_type);
  form_data.append('investigator', this.state.investigator);
  form_data.append('co_inves1', this.state.co_inves1);
  form_data.append('co_inves2', this.state.co_inves2);
  form_data.append('p_type', this.state.p_type);
  form_data.append('funding_agent', this.state.funding_agent);
  form_data.append('amt', this.state.amt === null ? '' : this.state.amt);  
  form_data.append('durationfrom', this.state.durationfrom);
  form_data.append('durationto', this.state.durationto);
  form_data.append('department', this.state.department);
  form_data.append('co_dep', this.state.co_dep);
  form_data.append('co_inst', this.state.co_inst);
  form_data.append('pro_abstract', this.state.pro_abstract);
  
  //display values in console
  /*
  for (var pair of form_data.entries()) {
    console.log(pair[0]+ ' : ' + pair[1]); 
  }
  */
  this.props.editProject(form_data,id);

  setTimeout( function(){
    window.open("/project","_self")
  }, 1000 );
}
};


setStates(props)
{
    this.setState({
      pro_title : props.project.pro_title,
      investigator: props.project.investigator,
      co_inves1: props.project.co_inves1,
      co_inves2: props.project.co_inves2,
      p_type: props.project.p_type,
      durationfrom: props.project.durationfrom,
      durationto: props.project.durationto,
      department: props.project.department,
      co_dep: props.project.co_dep,
      co_inst: props.project.co_inst,
      pro_abstract: props.project.pro_abstract,
      funding_agent : props.project.funding_agent,
      amt : props.project.amt,
      pdf : props.project.pdf,
      pro_type : props.project.pro_type,
    })
}


componentDidMount()
{    
  const id = this.props.match.params.id;
  this.props.getProjectbyID(id);
}


componentWillReceiveProps(props) {
    this.setStates(props);
    this.setState({
      pro : props.project
    })
}

  render() {
    var pro = this.state.pro;
    var pro_len = Object.keys(pro).length

    return (
      <div>
        <CustomLayout>
        {
        pro_len > 0 ? (
        <Form key = {pro.id} onSubmit ={this.onSubmit}>
        <div align="right">
          <Button type="danger" htmlType = "submit" onClick = {this.delete}>Delete</Button>
        </div>
        <select name="pro_type" onChange = {this.dropdowndef} defaultValue={pro.pro_type}>
            <option value="on_going">ON GOING</option>
            <option value="completed">COMPLETED</option>
        </select><br/><br/>
          <Form.Item label="PROJECT TITLE">
          <Input name = "pro_title" placeholder="Enter Project Title" defaultValue={pro.pro_title} required onChange = {this.onChange} />
          </Form.Item>
          <Form.Item label="PROJECT TYPE">
          <select name="p_type" onChange = {this.dropdowndef} defaultValue={pro.p_type}> 
            <option value="Research">RESEARCH</option>
            <option value="Infra Structure">INFRA STRUCTURE</option>
            <option value="Consultancy">CONSULTANCY</option>
          </select>
          </Form.Item>
          <Form.Item label="PRINCIPLE INVESTIGATOR/COORDINATOR">
          <Input name = "investigator" placeholder="Enter Investigator Name" defaultValue={pro.investigator}  onChange = {this.onChange} />
          </Form.Item>
          <Form.Item label="CO-INVESTIGATOR1">
          <Input name = "co_inves1"  onChange = {this.onChange} defaultValue={pro.co_inves1}/>
          </Form.Item>
          <Form.Item label="CO-INVESTIGATOR2">
          <Input name = "co_inves2"  onChange = {this.onChange} defaultValue={pro.co_inves2}/>
          </Form.Item>
          <Form.Item label="FUNDING AGENT">
          <Input name = "funding_agent" placeholder="Enter Funding Agent" defaultValue={pro.funding_agent}  onChange = {this.onChange} />
          </Form.Item>
          <Form.Item label="AMOUNT">
          <Input type="number" name = "amt" placeholder="Enter Amount" defaultValue={pro.amt}  onChange = {this.onChange} />
          </Form.Item>
          <Form.Item label="DURATION">
            <label>From</label>{'\u00A0'}{'\u00A0'}
            <input type = "date" required name="durationfrom" defaultValue={pro.durationfrom} onChange={this.onChange}></input>
            {'\u00A0'}{'\u00A0'}
            <label>To</label>{'\u00A0'}{'\u00A0'}           
            <input type = "date" required name="durationto" defaultValue={pro.durationto} onChange={this.onChange}></input>
          </Form.Item>
          <Form.Item label="DEPARTMENT">
            <select name="department" defaultValue={pro.department} onChange = {this.dropdowndef}>
            <option value=""> -- select an option -- </option>
            <option value="ADDITIONAL CONTROLLER OF EXAMINATION">ADDITIONAL CONTROLLER OF EXAMINATION</option>
            <option value="Administrative Office">Administrative Office</option>
            <option value="Alagappa College of Technology">Alagappa College of Technology</option>
            <option value="Anna University">Anna University</option>
            <option value="Anna University Sport Board">Anna University Sport Board</option>
            <option value="AU-FRG Institute for CAD/CAM">AU-FRG Institute for CAD/CAM</option>
            <option value="AU-KBC Research Centre">AU-KBC Research Centre</option>
            <option value="AU-RU Urban Energy Centre">AU-RU Urban Energy Centre</option>
            <option value="AU-TVS Centre for Quality Management">AU-TVS Centre for Quality Management</option>
            <option value="Audio Visual Research Centre">Audio Visual Research Centre</option>
            <option value="Boys Hostel">Boys Hostel</option>
            <option value="Building Technology Centre">Building Technology Centre</option>
            <option value="Centre for Academic Courses">Centre for Academic Courses</option>
            <option value="Centre for Admissions">Centre for Admissions</option>
            <option value="Centre for Aerospace Research">Centre for Aerospace Research</option>
            <option value="Centre for Affliation of Institutions">Centre for Affliation of Institutions</option>
            <option value="Centre for Alumni Affairs">Centre for Alumni Affairs</option>
            <option value="Centre for Applied Research in Indic Technologies">Centre for Applied Research in Indic Technologies</option>
            <option value="Centre for Bio Technology">Centre for Bio Technology</option>
            <option value="Centre for Climate Change and Adaptation Research">Centre for Climate Change and Adaptation Research</option>
            <option value="Centre for Development of Tamil in Engineering & Technology">Centre for Development of Tamil in Engineering & Technology</option>
            <option value="Centre for Disaster Mitigation and Management">Centre for Disaster Mitigation and Management</option>
            <option value="Centre for Distance Education">Centre for Distance Education</option>
            <option value="Centre for Empowerment of Women">Centre for Empowerment of Women</option>
            <option value="Centre for Enterpreneurship Development">Centre for Enterpreneurship Development</option>
            <option value="Centre for Entrance Examinations">Centre for Entrance Examinations</option>
            <option value="Centre for Environmantal Studies">Centre for Environmantal Studies</option>
            <option value="Centre for Faculty Development">Centre for Faculty Development</option>
            <option value="Centre for Food Technology">Centre for Food Technology</option>
            <option value="Centre for Geoscience and Engineering">Centre for Geoscience and Engineering</option>
            <option value="Centre for Human Settlements">Centre for Human Settlements</option>
            <option value="Centre for Intellectual Property Right and Trade Marks">Centre for Intellectual Property Right and Trade Marks</option>
            <option value="Centre for International Affairs">Centre for International Affairs</option>
            <option value="Centre for Medical Electronics">Centre for Medical Electronics</option>
            <option value="Centre for Nano Science and Technology">Centre for Nano Science and Technology</option>
            <option value="Centre for Natural and Renewable Sources of Energy">Centre for Natural and Renewable Sources of Energy</option>
            <option value="Centre for Professional Development Education">Centre for Professional Development Education</option>
            <option value="Centre for Research">Centre for Research</option>
            <option value="Centre for Technology Development and Transfer">Centre for Technology Development and Transfer</option>
            <option value="Centre for University Industry Collaboration">Centre for University Industry Collaboration</option>
            <option value="Centre for Water Resources">Centre for Water Resources</option>
            <option value="Centre with Potential for Excellence in Environment Science">Centre with Potential for Excellence in Environment Science</option>
            <option value="Chemical Engineering Workshop">Chemical Engineering Workshop</option>
            <option value="Civil/Electrical Minor Work Cells">Civil/Electrical Minor Work Cells</option>
            <option value="College of Engineering Guindy">College of Engineering Guindy</option>
            <option value="Computer Centre - MIT">Computer Centre - MIT</option>
            <option value="Controller of Examination - MIT">Controller of Examination - MIT</option>
            <option value="Crystal Growth Centre">Crystal Growth Centre</option>
            <option value="Department of Aerospace Engineering">Department of Aerospace Engineering</option>
            <option value="Department of Applied Science and Humanities">Department of Applied Science and Humanities</option>
            <option value="Department of Applied Science and Technology">Department of Applied Science and Technology</option>
            <option value="Department of Architecture">Department of Architecture</option>
            <option value="Department of Automobile Engineering">Department of Automobile Engineering</option>
            <option value="Department of Biotechnology">Department of Biotechnology</option>
            <option value="Department of Ceramic Technology">Department of Ceramic Technology</option>
            <option value="Department of Chemical Engineering">Department of Chemical Engineering</option>
            <option value="Department of Chemistry">Department of Chemistry</option>
            <option value="Department of Civil Engineering">Department of Civil Engineering</option>
            <option value="Department of Computer Science and Engineering">Department of Computer Science and Engineering</option>
            <option value="Department of Computer Technology">Department of Computer Technology</option>
            <option value="Department of Electrical and Electronics Engineering">Department of Electrical and Electronics Engineering</option>
            <option value="Department of Electronics and Communication Engineering">Department of Electronics and Communication Engineering</option>
            <option value="Department of Electronics Engineering">Department of Electronics Engineering</option>
            <option value="Department of English">Department of English</option>
            <option value="Department of Geology">Department of Geology</option>
            <option value="Depatment of Industrial Engineering">Depatment of Industrial Engineering</option>
            <option value="Department of Information Science and Technology">Department of Information Science and Technology</option>
            <option value="Department of Information Technology">Department of Information Technology</option>
            <option value="Department of Instrumentation Engineering">Department of Instrumentation Engineering</option>
            <option value="Department of Leather Technology">Department of Leather Technology</option>
            <option value="Department of Management Studies">Department of Management Studies</option>
            <option value="Department of Manufacturing Engineering">Department of Manufacturing Engineering</option>
            <option value="Department of Mathematics">Department of Mathematics</option>
            <option value="Department of Mechanical Engineering">Department of Mechanical Engineering</option>
            <option value="Department of Media Sciences">Department of Media Sciences</option>
            <option value="Department of Medical Physics">Department of Medical Physics</option>
            <option value="Department of Mining Engineering">Department of Mining Engineering</option>
            <option value="Department of Physics">Department of Physics</option>
            <option value="Department of Planning">Department of Planning</option>
            <option value="Department of Printing Technology">Department of Printing Technology</option>
            <option value="Department of Production Technolgy">Department of Production Technolgy</option>
            <option value="Depertment of Rubber and Plastic Technology">Depertment of Rubber and Plastic Technology</option>
            <option value="Department of Textile Technology">Department of Textile Technology</option>
            <option value="Distance Education Study Centre">Distance Education Study Centre</option>
            <option value="Division of Applied Science and Humanities">Division of Applied Science and Humanities</option>
            <option value="Division of Avonics Engineering">Division of Avonics Engineering</option>
            <option value="Division of Central Workshop">Division of Central Workshop</option>
            <option value="Division of Engineering Design">Division of Engineering Design</option>
            <option value="Division of High Voltage Engineering">Division of High Voltage Engineering</option>
            <option value="Division of Power System">Division of Power System</option>
            <option value="Division of Refrigeration and Air Conditioning">Division of Refrigeration and Air Conditioning</option>
            <option value="Division of Soil Mechanics and Foundation Management">Division of Soil Mechanics and Foundation Management</option>
            <option value="Division of Structural Engineering">Division of Structural Engineering</option>
            <option value="Division of Transportation Engineering">Division of Transportation Engineering</option>
            <option value="Division of Internal Combustion Engineering">Division of Internal Combustion Engineering</option>
            <option value="E-governance Project">E-governance Project</option>
            <option value="Educational Multimedia Research Centre">Educational Multimedia Research Centre</option>
            <option value="Estate Office">Estate Office</option>
            <option value="Estate Office - MIT">Estate Office - MIT</option>
            <option value="Faculty of Architecture and Planning">Faculty of Architecture and Planning</option>
            <option value="Faculty of Civil Engineering">Faculty of Civil Engineering</option>
            <option value="Faculty of Electrical and Electronic Engineering">Faculty of Electrical and Electronic Engineering</option>
            <option value="Faculty of Information and Communication Engineering">Faculty of Information and Communication Engineering</option>
            <option value="Faculty of Management Sciences">Faculty of Management Sciences</option>
            <option value="Faculty of Mechanical Engineering">Faculty of Mechanical Engineering</option>
            <option value="Faculty of Science and Humanities">Faculty of Science and Humanities</option>
            <option value="Faculty of Technology">Faculty of Technology</option>
            <option value="Girls Hostel">Girls Hostel</option>
            <option value="Health Care">Health Care</option>
            <option value="Institute of Energy Studies">Institute of Energy Studies</option>
            <option value="Institute of Ocean Management">Institute of Ocean Management</option>
            <option value="Institute of Remote Sensing">Institute of Remote Sensing</option>
            <option value="Internal Quality Assurance Cell">Internal Quality Assurance Cell</option>
            <option value="Knowledge Data Centre">Knowledge Data Centre</option>
            <option value="Library MIT">Library MIT</option>
            <option value="Logistic Centre">Logistic Centre</option>
            <option value="Madras Institute of Technology">Madras Institute of Technology</option>
            <option value="Maintenance Cell">Maintenance Cell</option>
            <option value="National Cadet Corps">National Cadet Corps</option>
            <option value="National Hub for Healthcare Instrumentation Development">National Hub for Healthcare Instrumentation Development</option>
            <option value="National Service Scheme">National Service Scheme</option>
            <option value="Office of the Controller of Examinations">Office of the Controller of Examinations</option>
            <option value="Ramanujan Computing Centre">Ramanujan Computing Centre</option>
            <option value="Registrar office">Registrar office</option>
            <option value="SC/ST Cell">SC/ST Cell</option>
            <option value="School of Architecture and Planning">School of Architecture and Planning</option>
            <option value="Sports Board">Sports Board</option>
            <option value="Student Affairs">Student Affairs</option>
            <option value="Syndicate">Syndicate</option>
            <option value="Training Centre for Career Advancement">Training Centre for Career Advancement</option>
            <option value="University Library">University Library</option>
            <option value="Workshop - MIT">Workshop - MIT</option>
            <option value="Youth Red Cross">Youth Red Cross</option>
            <option value="Others">Others</option>
          </select>
          </Form.Item>
          <Form.Item label="CO-DEPARTMENT">
            <select name="co_dep" defaultValue={pro.co_dep} onChange = {this.dropdowndef}>
            <option value=""> -- select an option -- </option>
            <option value="ADDITIONAL CONTROLLER OF EXAMINATION">ADDITIONAL CONTROLLER OF EXAMINATION</option>
            <option value="Administrative Office">Administrative Office</option>
            <option value="Alagappa College of Technology">Alagappa College of Technology</option>
            <option value="Anna University">Anna University</option>
            <option value="Anna University Sport Board">Anna University Sport Board</option>
            <option value="AU-FRG Institute for CAD/CAM">AU-FRG Institute for CAD/CAM</option>
            <option value="AU-KBC Research Centre">AU-KBC Research Centre</option>
            <option value="AU-RU Urban Energy Centre">AU-RU Urban Energy Centre</option>
            <option value="AU-TVS Centre for Quality Management">AU-TVS Centre for Quality Management</option>
            <option value="Audio Visual Research Centre">Audio Visual Research Centre</option>
            <option value="Boys Hostel">Boys Hostel</option>
            <option value="Building Technology Centre">Building Technology Centre</option>
            <option value="Centre for Academic Courses">Centre for Academic Courses</option>
            <option value="Centre for Admissions">Centre for Admissions</option>
            <option value="Centre for Aerospace Research">Centre for Aerospace Research</option>
            <option value="Centre for Affliation of Institutions">Centre for Affliation of Institutions</option>
            <option value="Centre for Alumni Affairs">Centre for Alumni Affairs</option>
            <option value="Centre for Applied Research in Indic Technologies">Centre for Applied Research in Indic Technologies</option>
            <option value="Centre for Bio Technology">Centre for Bio Technology</option>
            <option value="Centre for Climate Change and Adaptation Research">Centre for Climate Change and Adaptation Research</option>
            <option value="Centre for Development of Tamil in Engineering & Technology">Centre for Development of Tamil in Engineering & Technology</option>
            <option value="Centre for Disaster Mitigation and Management">Centre for Disaster Mitigation and Management</option>
            <option value="Centre for Distance Education">Centre for Distance Education</option>
            <option value="Centre for Empowerment of Women">Centre for Empowerment of Women</option>
            <option value="Centre for Enterpreneurship Development">Centre for Enterpreneurship Development</option>
            <option value="Centre for Entrance Examinations">Centre for Entrance Examinations</option>
            <option value="Centre for Environmantal Studies">Centre for Environmantal Studies</option>
            <option value="Centre for Faculty Development">Centre for Faculty Development</option>
            <option value="Centre for Food Technology">Centre for Food Technology</option>
            <option value="Centre for Geoscience and Engineering">Centre for Geoscience and Engineering</option>
            <option value="Centre for Human Settlements">Centre for Human Settlements</option>
            <option value="Centre for Intellectual Property Right and Trade Marks">Centre for Intellectual Property Right and Trade Marks</option>
            <option value="Centre for International Affairs">Centre for International Affairs</option>
            <option value="Centre for Medical Electronics">Centre for Medical Electronics</option>
            <option value="Centre for Nano Science and Technology">Centre for Nano Science and Technology</option>
            <option value="Centre for Natural and Renewable Sources of Energy">Centre for Natural and Renewable Sources of Energy</option>
            <option value="Centre for Professional Development Education">Centre for Professional Development Education</option>
            <option value="Centre for Research">Centre for Research</option>
            <option value="Centre for Technology Development and Transfer">Centre for Technology Development and Transfer</option>
            <option value="Centre for University Industry Collaboration">Centre for University Industry Collaboration</option>
            <option value="Centre for Water Resources">Centre for Water Resources</option>
            <option value="Centre with Potential for Excellence in Environment Science">Centre with Potential for Excellence in Environment Science</option>
            <option value="Chemical Engineering Workshop">Chemical Engineering Workshop</option>
            <option value="Civil/Electrical Minor Work Cells">Civil/Electrical Minor Work Cells</option>
            <option value="College of Engineering Guindy">College of Engineering Guindy</option>
            <option value="Computer Centre - MIT">Computer Centre - MIT</option>
            <option value="Controller of Examination - MIT">Controller of Examination - MIT</option>
            <option value="Crystal Growth Centre">Crystal Growth Centre</option>
            <option value="Department of Aerospace Engineering">Department of Aerospace Engineering</option>
            <option value="Department of Applied Science and Humanities">Department of Applied Science and Humanities</option>
            <option value="Department of Applied Science and Technology">Department of Applied Science and Technology</option>
            <option value="Department of Architecture">Department of Architecture</option>
            <option value="Department of Automobile Engineering">Department of Automobile Engineering</option>
            <option value="Department of Biotechnology">Department of Biotechnology</option>
            <option value="Department of Ceramic Technology">Department of Ceramic Technology</option>
            <option value="Department of Chemical Engineering">Department of Chemical Engineering</option>
            <option value="Department of Chemistry">Department of Chemistry</option>
            <option value="Department of Civil Engineering">Department of Civil Engineering</option>
            <option value="Department of Computer Science and Engineering">Department of Computer Science and Engineering</option>
            <option value="Department of Computer Technology">Department of Computer Technology</option>
            <option value="Department of Electrical and Electronics Engineering">Department of Electrical and Electronics Engineering</option>
            <option value="Department of Electronics and Communication Engineering">Department of Electronics and Communication Engineering</option>
            <option value="Department of Electronics Engineering">Department of Electronics Engineering</option>
            <option value="Department of English">Department of English</option>
            <option value="Department of Geology">Department of Geology</option>
            <option value="Depatment of Industrial Engineering">Depatment of Industrial Engineering</option>
            <option value="Department of Information Science and Technology">Department of Information Science and Technology</option>
            <option value="Department of Information Technology">Department of Information Technology</option>
            <option value="Department of Instrumentation Engineering">Department of Instrumentation Engineering</option>
            <option value="Department of Leather Technology">Department of Leather Technology</option>
            <option value="Department of Management Studies">Department of Management Studies</option>
            <option value="Department of Manufacturing Engineering">Department of Manufacturing Engineering</option>
            <option value="Department of Mathematics">Department of Mathematics</option>
            <option value="Department of Mechanical Engineering">Department of Mechanical Engineering</option>
            <option value="Department of Media Sciences">Department of Media Sciences</option>
            <option value="Department of Medical Physics">Department of Medical Physics</option>
            <option value="Department of Mining Engineering">Department of Mining Engineering</option>
            <option value="Department of Physics">Department of Physics</option>
            <option value="Department of Planning">Department of Planning</option>
            <option value="Department of Printing Technology">Department of Printing Technology</option>
            <option value="Department of Production Technolgy">Department of Production Technolgy</option>
            <option value="Depertment of Rubber and Plastic Technology">Depertment of Rubber and Plastic Technology</option>
            <option value="Department of Textile Technology">Department of Textile Technology</option>
            <option value="Distance Education Study Centre">Distance Education Study Centre</option>
            <option value="Division of Applied Science and Humanities">Division of Applied Science and Humanities</option>
            <option value="Division of Avonics Engineering">Division of Avonics Engineering</option>
            <option value="Division of Central Workshop">Division of Central Workshop</option>
            <option value="Division of Engineering Design">Division of Engineering Design</option>
            <option value="Division of High Voltage Engineering">Division of High Voltage Engineering</option>
            <option value="Division of Power System">Division of Power System</option>
            <option value="Division of Refrigeration and Air Conditioning">Division of Refrigeration and Air Conditioning</option>
            <option value="Division of Soil Mechanics and Foundation Management">Division of Soil Mechanics and Foundation Management</option>
            <option value="Division of Structural Engineering">Division of Structural Engineering</option>
            <option value="Division of Transportation Engineering">Division of Transportation Engineering</option>
            <option value="Division of Internal Combustion Engineering">Division of Internal Combustion Engineering</option>
            <option value="E-governance Project">E-governance Project</option>
            <option value="Educational Multimedia Research Centre">Educational Multimedia Research Centre</option>
            <option value="Estate Office">Estate Office</option>
            <option value="Estate Office - MIT">Estate Office - MIT</option>
            <option value="Faculty of Architecture and Planning">Faculty of Architecture and Planning</option>
            <option value="Faculty of Civil Engineering">Faculty of Civil Engineering</option>
            <option value="Faculty of Electrical and Electronic Engineering">Faculty of Electrical and Electronic Engineering</option>
            <option value="Faculty of Information and Communication Engineering">Faculty of Information and Communication Engineering</option>
            <option value="Faculty of Management Sciences">Faculty of Management Sciences</option>
            <option value="Faculty of Mechanical Engineering">Faculty of Mechanical Engineering</option>
            <option value="Faculty of Science and Humanities">Faculty of Science and Humanities</option>
            <option value="Faculty of Technology">Faculty of Technology</option>
            <option value="Girls Hostel">Girls Hostel</option>
            <option value="Health Care">Health Care</option>
            <option value="Institute of Energy Studies">Institute of Energy Studies</option>
            <option value="Institute of Ocean Management">Institute of Ocean Management</option>
            <option value="Institute of Remote Sensing">Institute of Remote Sensing</option>
            <option value="Internal Quality Assurance Cell">Internal Quality Assurance Cell</option>
            <option value="Knowledge Data Centre">Knowledge Data Centre</option>
            <option value="Library MIT">Library MIT</option>
            <option value="Logistic Centre">Logistic Centre</option>
            <option value="Madras Institute of Technology">Madras Institute of Technology</option>
            <option value="Maintenance Cell">Maintenance Cell</option>
            <option value="National Cadet Corps">National Cadet Corps</option>
            <option value="National Hub for Healthcare Instrumentation Development">National Hub for Healthcare Instrumentation Development</option>
            <option value="National Service Scheme">National Service Scheme</option>
            <option value="Office of the Controller of Examinations">Office of the Controller of Examinations</option>
            <option value="Ramanujan Computing Centre">Ramanujan Computing Centre</option>
            <option value="Registrar office">Registrar office</option>
            <option value="SC/ST Cell">SC/ST Cell</option>
            <option value="School of Architecture and Planning">School of Architecture and Planning</option>
            <option value="Sports Board">Sports Board</option>
            <option value="Student Affairs">Student Affairs</option>
            <option value="Syndicate">Syndicate</option>
            <option value="Training Centre for Career Advancement">Training Centre for Career Advancement</option>
            <option value="University Library">University Library</option>
            <option value="Workshop - MIT">Workshop - MIT</option>
            <option value="Youth Red Cross">Youth Red Cross</option>
            <option value="Others">Others</option>
          </select>
          </Form.Item>
          <Form.Item label="CO-INSTITUTION">
          <Input name = "co_inst" defaultValue={pro.co_inst} onChange = {this.onChange} />
          </Form.Item>
          <Form.Item label="PROJECT ABSTRACT">
            <textarea name = "pro_abstract" defaultValue={pro.pro_abstract} onChange = {this.onChange}></textarea>
          </Form.Item>
          <Form.Item label="EXISTING PDF">
            <Button span={3} target="ref" onClick={() => this.popPDF(pro.pdf)}>View</Button>
          </Form.Item>
          <Form.Item label="ADD NEW PDF">
            <input type="file" name="pdf" accept="application/pdf"  onChange = {this.onFileChange}></input>
          </Form.Item>
          <br/>
          <Form.Item>
            <Button type="primary" htmlType = "submit" disabled = {this.state.disabled}>Submit</Button>
          </Form.Item>
        </Form>
        ) : (<h1></h1>)
        }
        </CustomLayout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    project: state.project.project_by_id
});


export default connect(mapStateToProps,{ editProject,getProjectbyID,deleteProject })(ProEdit);
