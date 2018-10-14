import { projectConstants } from "../constants"
const selectProject = PUID => ({
    type: projectConstants.SELECT_PROJECT,
    PUID: PUID
})

export const projectActions = {
    selectProject
}
