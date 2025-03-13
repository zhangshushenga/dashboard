<template>
    <div class="gpu_background-image">
        <div style="display: flex; flex-direction: row; flex: 1; align-items: center;">
            <div class="gpu_icon_image"></div>
            <div class="GPU_name">{{ this.gpuState.ec2Name + " " + "(" + this.gpuState.gpuName + ")" }}</div>
            <div style="flex-grow: 1"></div>
            <div class="GPU_detail">
                {{ this.gpuState.date }}
            </div>
        </div>
        <div class="GPU_description">
            <div class="GPU_description_row">
                <div>
                    <div class="GPU_description_title">GPU Fan</div>
                    <div class="GPU_description_text">{{ this.gpuState.fan }}</div>
                </div>
                <div>
                    <div class="GPU_description_title">Temp</div>
                    <div class="GPU_description_text">{{ this.gpuState.temp }}</div>
                </div>
                <div>
                    <div class="GPU_description_title">Perf</div>
                    <div class="GPU_description_text">{{ this.gpuState.perf }}</div>
                </div>
                <div>
                    <div class="GPU_description_title">MIG Mode</div>
                    <div class="GPU_description_text">{{ this.gpuState.migMode }}</div>
                </div>
                <div>
                    <div class="GPU_description_title">GPU Utilization</div>
                    <div class="GPU_description_text">{{ this.gpuState.gpuUtilization }}</div>
                </div>
            </div>
            <div class="GPU_description_row">
                <div>
                    <div class="GPU_description_title">Memory Usage</div>
                    <div class="GPU_description_text">{{ this.gpuState.memoryUsage }}</div>
                </div>
                <div>
                    <div class="GPU_description_title">Power Usage</div>
                    <div class="GPU_description_text">{{ this.gpuState.powerUsage }}</div>
                </div>
                <div>
                    <div class="GPU_description_title">Compute Mode</div>
                    <div class="GPU_description_text">{{ this.gpuState.computeMode }}</div>
                </div>
            </div>
        </div>
        <div class="GPU_description">
            <div class="GPU_description_row">
                <div>
                    <div class="GPU_description_title">GPU</div>
                    <div class="GPU_description_text">{{ "No." + this.gpuState.pGpu }}</div>
                </div>
                <div>
                    <div class="GPU_description_title">GIID</div>
                    <div class="GPU_description_text">{{ this.gpuState.pGiid }}</div>
                </div>
                <div>
                    <div class="GPU_description_title">CIID</div>
                    <div class="GPU_description_text">{{ this.gpuState.pCiid }}</div>
                </div>
                <div>
                    <div class="GPU_description_title">Type</div>
                    <div class="GPU_description_text">{{ this.gpuState.pType }}</div>
                </div>
                <div>
                    <div class="GPU_description_title">Process ID (PID)</div>
                    <div class="GPU_description_text">{{ this.gpuState.pPid }}</div>
                </div>
            </div>
            <div class="GPU_description_row">
                <div>
                    <div class="GPU_description_title">Process Name</div>
                    <div class="GPU_description_text">{{ this.gpuState.pProcessName }}</div>
                </div>
                <div>
                    <div class="GPU_description_title">GPU Memory Usage</div>
                    <div class="GPU_description_text">{{ this.gpuState.pMemoryUsage }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            gpuState: {
                ...this.gpuData
            }
        }
    },
    props: {
        //GPU卡信息
        gpuData: {
            type: Object,
            default: {
                "date": "",
                "ec2Name": "",
                "gpuName": "",
                "smiVersion": "",
                "driverVersion": "",
                "cudaVersion": "",
                "fan": "",
                "temp": "",
                "perf": "",
                "migMode": "",
                "gpuUtilization": "",
                "memoryUsage": "",
                "powerUsage": "",
                "computeMode": "",
                "pGpu": "",
                "pGiid": "",
                "pCiid": "",
                "pType": "",
                "pPid": "",
                "pProcessName": "",
                "pMemoryUsage": ""
            }
        }
    },
    mounted() {

    },
    methods: {

    },
    watch: {
        // Watch for changes to gpuData and update `gpuState` accordingly
        gpuData: {
            handler(newVal) {
                // Extract numeric value from the gpuUtilization string and convert to a number
                const gpuUtilizationValue = parseFloat(newVal.gpuUtilization.replace('%', '')) || 0;

                // Keep existing gpuUtilization if the new one is zero, else update it
                if (gpuUtilizationValue !== 0) {
                    this.gpuState.gpuUtilization = newVal.gpuUtilization;
                }

                // Update other fields unconditionally
                Object.keys(newVal).forEach(key => {
                    if (key !== "gpuUtilization") {
                        this.gpuState[key] = newVal[key];
                    }
                });
            },
            deep: true, // Enable deep watching for changes in nested objects
            immediate: true // Trigger immediately for initial prop assignment
        }
    }
};
</script>

<style scoped>
.gpu_background-image {
    width: 25vw;
    height: 28vh;
    display: flex;
    margin-bottom: 5%;
    flex-direction: column;
    background-image: url('../agentDashboard/assets/gpuBack.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.gpu_icon_image {
    width: 10%;
    height: 60%;
    background-image: url('../agentDashboard/assets/GPU_icon.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-left: 2%;
}

.GPU_name {
    color: #fff;
    font-size: calc(17 * 1rem / 14);
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    margin-left: 2%;
}

.GPU_detail {
    color: #FFF9;
    font-size: calc(7 * 1rem / 14);
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    margin-top: 1%;
    margin-right: 5%;
}

.GPU_description {
    display: flex;
    flex-direction: column;
    flex: 3;
    border-style: dashed;
    border-width: 1px;
    border-color: #32F07280;
    border-radius: 5px;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 2%;
    margin-bottom: 2%;
}

.GPU_description_row {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin: 2%;
}

.GPU_description_title {
    color: #FFF9;
    font-size: calc(12 * 1rem / 14);
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
}

.GPU_description_text {
    color: #32F072;
    font-size: calc(12 * 1rem / 14);
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    margin-top: 5%;
}
</style>