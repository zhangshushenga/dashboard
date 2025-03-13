const PSY_CURRENT_PROJECT = 'ATOM_CURRENT_PROJECT'

export function setCurrentProject(currentProject) {
    localStorage.setItem(PSY_CURRENT_PROJECT + process.env.NODE_ENV, JSON.stringify(currentProject))

}

export function getCurrentProject() {
    return JSON.parse(localStorage.getItem(PSY_CURRENT_PROJECT + process.env.NODE_ENV))
}