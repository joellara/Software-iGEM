import React, { Component } from "react"
import { connect } from "react-redux"
import InputGroup from "react-bootstrap/lib/InputGroup"
import FormControl from "react-bootstrap/lib/FormControl"
import Container from "react-bootstrap/lib/Container"
import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"
import Button from "react-bootstrap/lib/Button"
import { usersRef } from "../config/firebase"
import { Redirect } from "react-router"

class SelectProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectCode: "",
            projectName: "",
            projects: [],
            selectedProject: "dis"
        }
        this.handleChange = this.handleChange.bind(this)
        this.createProject = this.createProject.bind(this)
        this.getProjects = this.getProjects.bind(this)
    }
    componentDidMount() {
        this.getProjects()
    }
    getProjects() {
        const { UID } = this.props.auth
        usersRef.child(`${UID}/projects`).on("value", snapshot => {
            
            const payload = snapshot.val()
            if (payload) {
                this.setState({
                    ...this.state,
                    projects: payload
                })
            }
        })
    }
    createProject() {
        const { UID } = this.props.auth
        const { projectCode, projectName } = this.state
        usersRef
            .child(`${UID}/projects/${projectCode}`)
            .update({
                active: true,
                name: projectName
            })
            .then(() => {
                this.setState({
                    ...this.state,
                    projectCode: "",
                    projectName: ""
                })
            })
    }
    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }
    render() {
        const { UID } = this.props.auth
        if (!UID) {
            return <Redirect to="/login" />
        }
        let projectList = []
        const keysProjects = Object.keys(this.state.projects)
        if (keysProjects.length > 0) {
            projectList = keysProjects.map(key => {
                return (
                    <option key={key} value={key}>
                        {this.state.projects[key]["name"]}
                    </option>
                )
            })
        }
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Add new project</h3>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="projectCode">
                                    Project Code
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                onChange={this.handleChange}
                                value={this.state.projectCode}
                                name="projectCode"
                                placeholder="Project code"
                                aria-label="projectCode"
                                aria-describedby="projectCode"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="projectName">
                                    Project Name
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                onChange={this.handleChange}
                                value={this.state.projectName}
                                name="projectName"
                                placeholder="Project name"
                                aria-label="projectName"
                                aria-describedby="projectName"
                            />
                        </InputGroup>
                        <Button onClick={this.createProject}>Add</Button>
                    </Col>
                    <Col>
                        <h3>Select project</h3>
                        {projectList.length > 0 && (
                            <React.Fragment>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-project-select">
                                            Project
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        as="select"
                                        placeholder="Select project"
                                        aria-label="project"
                                        aria-describedby="basic-project-select"
                                        value={this.state.selectedProject}
                                        onChange={this.handleChange}
                                        name="selectedProject">
                                        <option value="dis" disabled>
                                            Choose project
                                        </option>
                                        {projectList}
                                    </FormControl>
                                </InputGroup>
                                <Button
                                    onClick={() => {
                                        this.props.handleSelectProject(
                                            this.state.selectedProject
                                        )
                                    }}>
                                    Select
                                </Button>
                            </React.Fragment>
                        )}
                        {projectList.length === 0 && <h4>No projects found</h4>}
                    </Col>
                </Row>
            </Container>
        )
    }
}
const mapStateToPros = ({ project, auth }) => ({
    project,
    auth
})
export default connect(mapStateToPros)(SelectProject)
