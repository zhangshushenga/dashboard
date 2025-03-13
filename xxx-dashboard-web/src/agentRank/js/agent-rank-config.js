// 默认配置数据
const defaultConfig = {
    agents: [
        
    ]
};

// 从localStorage读取数据
function loadConfig() {
    try {
        const savedConfig = localStorage.getItem('agentConfig');
        return savedConfig ? JSON.parse(savedConfig) : defaultConfig;
    } catch (error) {
        console.error('Error loading config:', error);
        return defaultConfig;
    }
}

// 保存数据到localStorage
function saveConfig(config) {
    try {
        localStorage.setItem('agentConfig', JSON.stringify(config));
        return true;
    } catch (error) {
        console.error('Error saving config:', error);
        return false;
    }
}

// 保存表单数据
function saveFormData() {
    const config = loadConfig();
    const configPanel = document.querySelector('.config-panel');
    const editId = configPanel.dataset.editId;
    
    // 收集表单数据
    const formData = {
        id: editId ? parseInt(editId) : Date.now(), // 如果是编辑则使用原id，否则生成新id
        name: document.querySelector('input[placeholder="请输入Agent名称"]').value,
        agentId: document.querySelector('input[placeholder="请输入Agent ID"]').value, // 获取Agent ID
        avatar: document.querySelector('.image-preview').style.backgroundImage.replace('url("', '').replace('")', ''),
        launchDate: document.getElementById('launchDate').value, // 获取上线时间
        members: Array.from(document.querySelectorAll('.member-item')).map(item => ({
            name: item.querySelector('input[placeholder="请输入成员名称"]').value,
            role: item.querySelector('.form-select').value
        })),
        stats: {
            totalUsers: 0,
            currentUsers: 0,
            thirtyDayUsers: 0,
            serviceUsers: 0,
            complexUsers: 0
        }
    };

    if (editId) {
        // 编辑现有Agent
        const index = config.agents.findIndex(a => a.id === parseInt(editId));
        if (index !== -1) {
            // 保留原有的stats数据
            formData.stats = config.agents[index].stats;
            config.agents[index] = formData;
        }
    } else {
        // 添加新Agent
        config.agents.push(formData);
    }

    // 保存到localStorage
    if (saveConfig(config)) {
        alert('保存成功！');
        renderAgentList(); // 重新渲染列表
        document.querySelector('.config-modal').style.display = 'none';
        return true;
    } else {
        alert('保存失败，请重试！');
        return false;
    }
}

// 删除Agent
function deleteAgent(id) {
    if (confirm('确定要删除这个Agent吗？')) {
        const config = loadConfig();
        config.agents = config.agents.filter(agent => agent.id !== id);
        if (saveConfig(config)) {
            alert('删除成功！');
            renderAgentList();
        } else {
            alert('删除失败，请重试！');
        }
    }
}

// 清空配置
function clearConfig() {
    if (confirm('确定要清空所有配置吗？')) {
        localStorage.removeItem('agentConfig');
        alert('配置已清空！');
        renderAgentList(); // 重新渲染列表
    }
}

// 填充表单数据
function fillFormData(agent) {
    // 填充基本信息
    document.querySelector('input[placeholder="请输入Agent名称"]').value = agent.name;
    document.querySelector('input[placeholder="请输入Agent ID"]').value = agent.agentId; // 填充Agent ID
    if (agent.avatar) {
        document.querySelector('.image-preview').style.backgroundImage = `url('${agent.avatar}')`;
    }
    document.getElementById('launchDate').value = agent.launchDate || ''; // 填充上线时间

    // 清空并重新填充团队成员
    const teamMembers = document.querySelector('.team-members');
    teamMembers.innerHTML = agent.members.map(member => `
        <div class="member-item">
            <div class="form-group">
                <label>成员名称</label>
                <input type="text" class="form-input" placeholder="请输入成员名称" value="${member.name}">
            </div>
            <div class="form-group">
                <label>角色</label>
                <select class="form-select">
                    <option value="pm" ${member.role === 'pm' ? 'selected' : ''}>PM</option>
                    <option value="ux" ${member.role === 'ux' ? 'selected' : ''}>UX</option>
                    <option value="dev" ${member.role === 'dev' ? 'selected' : ''}>DEV</option>
                </select>
            </div>
            <button class="remove-member">删除</button>
        </div>
    `).join('');

    // 保存当前编辑的agent id
    document.querySelector('.config-panel').dataset.editId = agent.id;
}

// 清空表单数据
function clearFormData() {
    // 清空基本信息
    document.querySelector('input[placeholder="请输入Agent名称"]').value = '';
    document.querySelector('input[placeholder="请输入Agent ID"]').value = ''; // 清空Agent ID
    document.querySelector('.image-preview').style.backgroundImage = '';
    document.getElementById('launchDate').value = ''; // 清空上线时间

    // 重置团队成员为一个空成员
    document.querySelector('.team-members').innerHTML = `
        <div class="member-item">
            <div class="form-group">
                <label>成员名称</label>
                <input type="text" class="form-input" placeholder="请输入成员名称">
            </div>
            <div class="form-group">
                <label>角色</label>
                <select class="form-select">
                    <option value="pm">PM</option>
                    <option value="ux">UX</option>
                    <option value="dev">DEV</option>
                </select>
            </div>
            <button class="remove-member">删除</button>
        </div>
    `;

    // 移除编辑id
    document.querySelector('.config-panel').removeAttribute('data-edit-id');
}

// 渲染Agent列表
function renderAgentList() {
    const agentItems = document.querySelector('.agent-items');
    const config = loadConfig();
    // 判断config是否为空，如果为空就使用默认配置
    if (!config) {
        return;
    }
    // 判断一下config是否为空，如果为空就不显示底下的内容
    if (config.agents.length === 0) {
        agentItems.innerHTML = '';
        return;
    }

    console.error('config:', config);
    agentItems.innerHTML = config.agents.map(agent => `
        <div class="agent-item" data-id="${agent.id}">
            <div class="agent-info">
                <div class="agent-avatar" style="background-image: url('${agent.avatar}')"></div>
                <div class="agent-details">
                    <div class="agent-name">${agent.name}</div>
                    <div class="agent-members">
                        ${agent.members.map(member => `${member.name} (${member.role.toUpperCase()})`).join(' · ')}
                    </div>
                </div>
            </div>
            <div class="agent-actions">
                <button class="edit-btn">编辑</button>
                <button class="delete-btn">删除</button>
            </div>
        </div>
    `).join('');

    // 添加编辑按钮事件监听
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const agentId = parseInt(this.closest('.agent-item').dataset.id);
            const agent = config.agents.find(a => a.id === agentId);
            if (agent) {
                fillFormData(agent);
                document.querySelector('.config-modal').style.display = 'block';
            }
        });
    });
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    renderAgentList();
    
    // 添加新Agent按钮点击事件
    document.querySelector('.add-agent-btn').addEventListener('click', function() {
        clearFormData();
        document.querySelector('.config-modal').style.display = 'block';
    });
    
    // 清空配置按钮点击事件
    document.querySelector('.clear-config-btn').addEventListener('click', clearConfig); // 添加清空配置按钮点击事件
    
    // 关闭弹窗按钮点击事件
    document.querySelector('.close-modal').addEventListener('click', function() {
        document.querySelector('.config-modal').style.display = 'none';
    });
    
    // 点击遮罩层关闭弹窗
    document.querySelector('.modal-overlay').addEventListener('click', function() {
        document.querySelector('.config-modal').style.display = 'none';
    });

    // 为团队成员区域添加事件委托，处理删除按钮点击
    document.querySelector('.team-members').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-member')) {
            const memberItem = e.target.closest('.member-item');
            if (memberItem && document.querySelectorAll('.member-item').length > 1) {
                memberItem.remove(); // 从DOM中移除
            } else {
                alert('至少需要保留一个团队成员！');
            }
        }
    });

    // 添加成员按钮点击事件
    document.querySelector('.add-member').addEventListener('click', function() {
        const teamMembers = document.querySelector('.team-members');
        const newMemberHtml = `
            <div class="member-item">
                <div class="form-group">
                    <label>成员名称</label>
                    <input type="text" class="form-input" placeholder="请输入成员名称">
                </div>
                <div class="form-group">
                    <label>角色</label>
                    <select class="form-select">
                        <option value="pm">PM</option>
                        <option value="ux">UX</option>
                        <option value="dev">DEV</option>
                    </select>
                </div>
                <button class="remove-member">删除</button>
            </div>
        `;
        teamMembers.insertAdjacentHTML('beforeend', newMemberHtml);
    });

    // 修改取消按钮点击事件
    document.querySelector('.cancel-button').addEventListener('click', function() {
        const configModal = document.querySelector('.config-modal');
        const editId = document.querySelector('.config-panel').dataset.editId;
        
        if (editId) {
            // 如果是编辑模式，重新填充原始数据
            const config = loadConfig();
            const agent = config.agents.find(a => a.id === parseInt(editId));
            if (agent) {
                fillFormData(agent);
            }
        } else {
            // 如果是新增模式，清空表单
            clearFormData();
        }
        
        configModal.style.display = 'none';
    });

    // 修改保存按钮点击事件，添加表单验证
    document.querySelector('.save-button').addEventListener('click', function() {
        // 验证表单
        const agentName = document.querySelector('input[placeholder="请输入Agent名称"]').value.trim();
        if (!agentName) {
            alert('请输入Agent名称！');
            return;
        }

        const members = Array.from(document.querySelectorAll('.member-item')).map(item => ({
            name: item.querySelector('input[placeholder="请输入成员名称"]').value.trim(),
            role: item.querySelector('.form-select').value
        }));

        // 验证团队成员
        if (members.some(member => !member.name)) {
            alert('请填写所有团队成员的名称！');
            return;
        }

        // 验证通过，保存数据
        saveFormData();
    });

    // 返回按钮点击事件
    document.querySelector('.back-btn').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // 为删除按钮添加事件委托
    document.querySelector('.agent-items').addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const agentId = parseInt(e.target.closest('.agent-item').dataset.id);
            deleteAgent(agentId);
        }
    });

    // 添加图片上传预览功能
    document.getElementById('avatar').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imagePreview = document.querySelector('.image-preview');
                imagePreview.style.backgroundImage = `url('${e.target.result}')`;
                imagePreview.style.backgroundSize = 'cover';
                imagePreview.style.backgroundPosition = 'center';
            };
            reader.readAsDataURL(file);
        }
    });
});