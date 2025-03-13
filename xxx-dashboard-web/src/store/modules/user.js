import { bindWechat, getInfo, login, loginByWechat, loginByOw } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { getCurrentProject, setCurrentProject } from '@/utils/project'
import router, { resetRouter } from '@/router'

// const PSY_CURRENT_PROJECT = 'PSY_CURRENT_PROJECT'
const PSY_CURRENT_USER = 'PSY_CURRENT_USER'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userId: '',
  projectList: []
  // currentProject: JSON.parse(localStorage.getItem(PSY_CURRENT_PROJECT + process.env.NODE_ENV))
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_PROJECTLIST: (state, projectList) => {
    state.projectList = projectList
  }
  // SET_CURRENT_PROJECT: (state, currentProject) => {
  //   state.currentProject = currentProject
  //   localStorage.setItem(PSY_CURRENT_PROJECT + process.env.NODE_ENV, JSON.stringify(currentProject))
  // }
}

const actions = {
  // loginByWechat
  bindWechat({ commit }, code) {
    return new Promise((resolve, reject) => {
      bindWechat(code).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // loginByWechat
  loginByWechat({ commit }, code) {
    return new Promise((resolve, reject) => {
      loginByWechat(code).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // loginByOw
  loginByOw({ commit }, code) {
    return new Promise((resolve, reject) => {
      loginByOw(code).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: username.trim(), verCode: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // console.log(response)
        const { data } = response
        // console.log(data)
        data['roles'] = ['admin']
        // console.log(data)
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, userId, projectList } = data

        // roles must be a non-empty array
        // if (!roles || roles.length <= 0) {
        //   reject('getInfo: roles must be a non-null array!')
        // }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_USERID', userId)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        commit('SET_INTRODUCTION', 'super')
        if (projectList != undefined && projectList.length != 0) {
          commit('SET_PROJECTLIST', projectList)
          const currentProject = getCurrentProject()
          // console.log(currentProject)
          const currentProjectId = currentProject === undefined || currentProject === null || Object.keys(currentProject).length === 0 ? -1 : currentProject.id
          const index = projectList.findIndex((item) => {
            return item.id === currentProjectId
          })
          // 登录用户变更或项目权限变更需要重置
          if (userId != localStorage.getItem(PSY_CURRENT_USER + process.env.NODE_ENV) || index === -1) {
            localStorage.setItem(PSY_CURRENT_USER + process.env.NODE_ENV, userId)
            setCurrentProject(projectList[0])
            // commit('SET_CURRENT_PROJECT', projectList[0])
          } else {
            // 所选项目有内容变化需要更新
            if (projectList[index].name != currentProject.name) {
              setCurrentProject(projectList[index])
              // commit('SET_CURRENT_PROJECT', projectList[index])
            }
          }
        } else {
          commit('SET_PROJECTLIST', [])
          setCurrentProject({})
          // commit('SET_CURRENT_PROJECT', {})
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  changeCurrentProject({ commit, state }, currentProject) {
    setCurrentProject(currentProject)
    // commit('SET_CURRENT_PROJECT', currentProject)
  },

  // user logout
  logout({ commit, state, dispatch }) {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    removeToken()
    resetRouter()

    dispatch('tagsView/delAllViews', null, { root: true })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
