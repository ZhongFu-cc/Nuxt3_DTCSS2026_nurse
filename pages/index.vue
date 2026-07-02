<template>
    <main class="common-section">

        <div class="main-section">
            <div class="content">
                <div class="conference-info-box">

                    <h1 class="topic">第十四屆大林慈濟醫院血液透析通路治療與照護國際研討會</h1>
                    <p class="event-date">{{ t('eventDate') }}</p>
                    <p>{{ t('eventLocation') }}</p>
                </div>
                <div class="conference-registration-box">
                    <el-form class="registration-form" :model="formData" ref="registrationForm" label-position="top"
                        :rules="formRules" :validate-on-rule-change="false">

                        <div class="warning-text" style="text-align: center;font-size: 1.2rem;">{{ isFormLocked ?
                            '報名時間已截止，感謝您的熱情參與' : ''
                        }}</div>

                        <div class="things-to-note">
                            <h2>{{ t('registrationReminder') }}</h2>
                            <ul>
                                <li>{{ t('registrationInfo1') }}</li>
                                <!-- <li v-if="formData.category === '9'">報名後，可至註冊信箱點擊付款連結，進行付款，請於24小時內完成繳費，超過24小時須重新報名。</li> -->
                                <li>{{ t('registrationInfo2') }}</li>
                                <li>{{ t('registrationInfo3') }}</li>
                                <!-- <li v-if="formData.category === '9'">本活動不提供退費</li> -->
                            </ul>
                        </div>

                        <div class="form-section">
                            <div class="left-section">
                                <el-form-item prop="country" :label="t('country')">
                                    <el-select v-model="formData.country" filterable :placeholder="t('selectCountry')">
                                        <el-option v-for="item in country" :key="item" :label="item"
                                            :value="item"></el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item :label="t('category')" prop="category">
                                    <el-radio-group v-model="formData.category" filterable
                                        :placeholder="t('selectCategory')">
                                        <el-radio v-for="item in categorys" :key="item.value" :label="item.label"
                                            :value="item.value"></el-radio>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item :label="t('chineseName')" prop="chineseName">
                                    <el-input v-model="formData.chineseName" :placeholder="t('chineseName')"></el-input>
                                </el-form-item>
<!-- 
                                <div class="english-name">
                                    <el-form-item :label="t('firstName')" prop="firstName">
                                        <el-input v-model="formData.firstName" :placeholder="t('firstName')"></el-input>
                                    </el-form-item>

                                    <el-form-item :label="t('lastName')" prop="lastName">
                                        <el-input v-model="formData.lastName" :placeholder="t('lastName')"></el-input>
                                    </el-form-item>
                                </div> -->

                                <el-form-item :label="t('email')" prop="email">
                                    <el-input v-model="formData.email" :placeholder="t('email')"></el-input>
                                </el-form-item>

                                <el-form-item :label="t('confirmEmail')" prop="confirmEmail" :rules="confirmEmailRule">
                                    <el-input v-model="formData.confirmEmail"
                                        :placeholder="t('confirmEmail')"></el-input>
                                </el-form-item>

                                <div class="member-phone required">
                                    <el-form-item class="country-code" :label="t('phoneNum')" prop="countryCode">
                                        <div class="country-code-inner">
                                            <el-input :disabled="formData.country === 'Taiwan'"
                                                v-model="formData.countryCode" placeholder="Country Code"></el-input>
                                            <span>-</span>
                                        </div>
                                    </el-form-item>
                                    <el-form-item :class="lang === 'zh' ? 'domestic-phone-num' : 'oversea-phone-num'"
                                        :label="t('phoneNum')" prop="phoneNum">
                                        <el-input v-model="formData.phoneNum"></el-input>
                                    </el-form-item>
                                </div>


                                <!-- <el-form-item :label="t('password')" prop="password">
                                    <el-input v-model="formData.password" :placeholder="t('password')"
                                        type="password"></el-input>
                                </el-form-item>

                                <el-form-item :label="t('confirmPassword')" prop="confirmPassword"
                                    :rules="confirmPasswordRule">
                                    <el-input v-model="formData.confirmPassword" :placeholder="t('confirmPassword')"
                                        type="password"></el-input>
                                </el-form-item>
 -->



                            </div>

                            <div class="right-section">

                                <el-form-item v-if="formData.category === '2'" :label="t('hospital')" prop="receipt">
                                    <el-input v-model="formData.receipt" :placeholder="t('hospital')"></el-input>
                                </el-form-item>

                                <el-form-item v-if="formData.category === '3'" :label="t('hospital1')" prop="receipt">
                                    <el-input v-model="formData.receipt" :placeholder="t('hospital1')"></el-input>
                                </el-form-item>

                                <el-form-item :label="t('affiliation')" prop="affiliation">
                                    <el-input v-model="formData.affiliation" :placeholder="t('affiliation')"></el-input>
                                </el-form-item>

                                <el-form-item :label="t('jobTitle')" prop="jobTitle">
                                    <el-input v-model="formData.jobTitle" :placeholder="t('jobTitle')"></el-input>
                                </el-form-item>


                                <el-form-item :label="formData.country === 'Taiwan' ? t('idCard') : t('passport')"
                                    prop="idCard">
                                    <el-input v-model="formData.idCard"
                                        :placeholder="formData.country === 'Taiwan' ? t('idCard') : t('passport')"></el-input>
                                </el-form-item>

                                <el-form-item :label="t('captcha')" required>
                                    <div class="captcha-container">
                                        <el-input v-model="formData.verificationCode"
                                            :placeholder="t('captcha')"></el-input>
                                        <img :src="captcha.image" alt="captcha" @click="getCaptcha">
                                    </div>
                                </el-form-item>
                            </div>
                        </div>





                        <div class="reminder">
                            <p>{{ t('personalDataNotice') }}</p>
                            <p>{{ t('personalDataUsage') }}</p>
                            <p>{{ t('personalDataRights') }}</p>
                        </div>

                        <el-form-item>
                            <el-button :disabled="isFormLocked" class="submit-btn" type="primary"
                                @click="handleSubmit(registrationForm)">{{ t('submit')
                                }}</el-button>
                        </el-form-item>
                    </el-form>

                </div>

                <div class="agenda-box">
                    <img v-for="agenda in agendas" :key="agenda.id" :src="`${envMinio}${agenda.path}`" alt="agenda">
                </div>

            </div>
        </div>
    </main>
</template>
<script lang="ts" setup>
import { type FormRules, type FormInstance } from 'element-plus';
import { formRulesTW, codeMap } from '@/utils/validation-rules';
import countryJson from '@/assets/data/countries.json';

const { t } = useI18n();
const localePath = useLocalePath();
const country = ref(countryJson);
const lang = ref('');

const categorys = ref([
    { label: '護理人員(慈濟體系)', value: '2' },
    { label: '護理人員', value: '3' },
])

const getCaptcha = async () => {
    let res = await CSRrequest.get('/member/captcha');
    formData.verificationCode = '';
    Object.assign(captcha, res.data);
}

const captcha = reactive({
    image: '',
    key: ''
})

const vaildConfirmEmail = (rule: any, value: string, callback: any) => {

    if (!value) {
        callback(new Error(t('confirmEmailValidate')))
    } else if (value !== formData.email) {
        callback(new Error(t('confirmEmailValidateNotMatch')))
    } else {
        callback()
    }
}

const confirmEmailRule = [
    { required: true, message: t('confirmEmailValidate'), trigger: 'blur' },
    { validator: vaildConfirmEmail, trigger: 'blur' }
];

const confirmPasswordRule = [
    { required: true, message: t('confirmPasswordValidate'), trigger: 'blur' },
    {
        validator: (rule: any, value: string, callback: any) => {
            if (!value) {
                callback(new Error(t('confirmPasswordValidate')))
            } else if (value !== formData.password) {
                callback(new Error(t('confirmPasswordValidateNotMatch')))
            } else {
                callback()
            }
        }, trigger: 'blur'
    }
]

const checkIdCard = (rule: any, value: string, callback: any) => {
    if (formData.country !== 'Taiwan') {
        callback();
        return;
    }
    if (!value) callback(new Error("請輸入身分證字號"));
    if (value) {
        if (!/^[A-Z][0-9]{9}$/.test(value)) {
            callback({ valid: false, message: "身份證格式不正確" });
        }

        const placeCode = codeMap[value[0]];
        if (!placeCode) {
            callback({ valid: false, message: "首碼無效" });
        }

        const bodyCode = value.substring(1, 9);
        const lastCode = value[9];
        const calHead = (num: number): number =>
            Math.floor(num / 10) * 1 + (num % 10) * 9;
        const calBody = (code: string): number => {
            let sum = 0;
            for (let i = 0; i < code.length; i++) {
                sum += parseInt(code[i]) * (8 - i);
            }
            return sum;
        };
        const idSum =
            calHead(placeCode) + calBody(bodyCode) + parseInt(lastCode) * 1;
        const isValid = idSum % 10 === 0;
        if (!isValid) {
            callback({ valid: false, message: "身分證號不合法" });
        } else {
            callback();
        }
    }
};

const formData = reactive({
    category: '2',
    chineseName: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    country: 'Taiwan',
    idCard: '',
    email: '',
    confirmEmail: '',
    phone: '',
    countryCode: '886',
    phoneNum: '',
    affiliation: '',
    jobTitle: '',
    receipt: '',
    categoryExtra: '否',
    verificationCode: '',
    verificationKey: '',
    food: '素'
})

const formRules = computed<FormRules>(() => ({
    chineseName: [{ required: formData.country === 'Taiwan', message: t('chineseNameValidate'), trigger: "blur" }],
    firstName: [{ required: true, message: t('firstNameValidate'), trigger: "blur" }],
    lastName: [{ required: true, message: t('lastNameValidate'), trigger: "blur" }],
    email: [{ required: true, message: t('emailValidate'), trigger: "blur" }],
    confirmEmail: confirmEmailRule,
    countryCode: [{ required: true, message: t('phoneNumValidate'), trigger: "blur" }],
    receipt: [{ required: true, message: t('hospitalValidate'), trigger: "change" }],
    country: [{ required: true, message: t('countryValidate'), trigger: "change" }],
    idCard: [{ required: formData.country === 'Taiwan', validator: checkIdCard, trigger: "blur" }],
    // password: [{ required: true, message: t('passwordValidate'), trigger: "blur" }],
    // confirmPassword: confirmPasswordRule,
    affiliation: [{ required: true, message: t('affiliationValidate'), trigger: "blur" }],
    jobTitle: [{ required: true, message: t('jobTitleValidate'), trigger: "blur" }],
    category: [{ required: true, message: t('categoryValidate'), trigger: "change" }],
}))


const registrationForm = ref<FormInstance>();


// 送出資料後將立即跳轉至付款頁面，如未完成付款資料將於一天後刪除
const router = useRouter();

const submitMessage = () => {

}

const handleSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    formEl.validate(async (valid) => {
        if (valid) {
            // 提交表單邏輯
            formData.verificationKey = captcha.key; // 將驗證碼key添加到表單數據中
            formData.phone = formData.countryCode + '-' + formData.phoneNum; // 將國碼和電話號碼合併

            if (formData.category === '3') {
                ElMessageBox.confirm(t('registrationInfo2'), t('registrationInfoTitle'), {
                    confirmButtonText: t('confirm'),
                    cancelButtonText: t('cancel'),
                    type: 'warning',
                }).then(async () => {
                    let res = await CSRrequest.post(`/member`, {
                        body: formData
                    });
                    if (res.code === 200) {
                        ElNotification({
                            title: '報名成功',
                            message: res.msg,
                            type: 'success',
                        });
                        formEl.resetFields(); // 重置表單
                        router.push(localePath('/registration-success?category=3'));
                    } else {
                        ElNotification({
                            title: '報名失敗',
                            message: res.msg,
                            type: 'error',
                        });
                        getCaptcha(); // 重新獲取驗證碼
                    }
                }).catch(() => {
                    getCaptcha(); // 重新獲取驗證碼
                });
                return;
            }

            let res = await CSRrequest.post(`/member`, {
                body: formData
            });
            if (res.code === 200) {
                ElNotification({
                    title: '報名成功',
                    message: res.msg,
                    type: 'success',
                });
                formEl.resetFields(); // 重置表單
                router.push(localePath('/registration-success'));
            } else {
                ElNotification({
                    title: '報名失敗',
                    message: res.msg,
                    type: 'error',
                });
                getCaptcha(); // 重新獲取驗證碼
            }

        } else {
            console.error('表單驗證失敗');
            ElMessage.error('請檢查表單輸入是否正確');
            getCaptcha(); // 表單驗證失敗時重新獲取驗證碼
        }
    });
};


const isFormLocked = ref(false);

//判斷截止時間
function checkDeadline() {
    const deadline = new Date('2026-08-07T23:59:59'); // 設定截止時間
    // const deadline = new Date('2025-08-13T10:27:30'); // 設定截止時間
    const now = new Date();
    isFormLocked.value = now > deadline;
}
onMounted(() => {
    getCaptcha();

    // 判斷截止時間
    checkDeadline(); // 頁面載入時檢查一次
    setInterval(checkDeadline, 1000 * 60); // 每分鐘檢查一次
    nextTick(() => {
        lang.value = localStorage.getItem('lang') || 'zh'; // 頁面載入後獲取語言設定
    })
});

const envMinio = useRuntimeConfig().public.minio
console.log('envMinio', envMinio)


const agendas = ref<any[]>([])
const fetchAgendaFile = async () => {
    try {
        const res: any = await CSRrequest.get(`/publish-file/agenda`)
        agendas.value = res.data
        console.log('agendas', agendas.value)
    } catch (error) {
        console.error('Error fetching agenda file:', error);
    }
}

onMounted(() => {
    fetchAgendaFile()
})



</script>
<style lang="scss" scoped>
.common-section {
    font-family: $common-section-font-family;
    min-height: 60vw;

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3rem;
        padding: 0 2.5rem;

        @media screen and (max-width: 768px) {
            flex-direction: column;
            align-items: center;
            padding: 0;
        }

        .conference-info-box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
            padding: 20px;
            text-align: center;


            .topic {
                font-size: 1.5rem;
                font-weight: bold;
                color: #333;
                margin-bottom: 20px;
            }

            .event-date {
                font-size: 1.5rem;
                font-weight: bold;
                color: #894a4a;
                margin-bottom: 20px;
            }

            .btn-box {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-top: 20px;

                .el-button {
                    border-radius: 20px;
                    border: none;
                }

                .agenda-download-btn {
                    background-color: #971B6A;
                    color: white;
                }

                .add-calendar-btn {
                    background-color: #CA7D8F;
                    color: white;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }


                @media screen and (max-width: 768px) {
                    flex-direction: column;
                    align-items: center;

                    .free {
                        width: 100%;
                        margin-bottom: 10px;
                    }
                }
            }
        }

        .conference-registration-box {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);


            .free {
                color: red;
            }

            .registration-form {
                width: 90%;
                margin: 0 auto;
                // font-size: 1rem;

                :deep(.el-form-item__label) {
                    font-size: 1rem;
                    color: #333;
                }

                :deep(.el-input__inner) {
                    font-size: 1rem;
                    color: #333;
                }

                :deep(.el-radio__label) {
                    font-size: 1rem;
                    color: #333;
                }

                :deep(.el-select__inner) {
                    font-size: 1rem;
                    color: #333;
                }

                .things-to-note {
                    margin: 5% 0;

                    h2 {
                        font-size: 1.5rem;
                    }

                    ul {
                        font-size: 1rem;
                    }
                }

                .form-section {
                    display: flex;
                    gap: 2rem;

                    @media screen and (max-width: 768px) {
                        flex-direction: column;
                        gap: 1rem;

                    }

                    .left-section,
                    .right-section {
                        flex: 1;

                        .english-name {
                            display: flex;
                            gap: 1rem;

                            @media screen and (max-width: 768px) {
                                flex-direction: column;
                                gap: 1rem;
                            }
                        }

                        .member-phone {
                            display: flex;
                            gap: 2rem;

                            .country-code {
                                flex: 1;

                                .country-code-inner {
                                    display: flex;
                                    align-items: center;
                                    gap: 2rem;

                                    :deep(.el-input) {
                                        flex: 2;
                                    }
                                }

                            }

                            .oversea-phone-num {
                                flex: 2;

                                :deep(.el-form-item__label) {
                                    color: white;
                                    position: relative;

                                    &::after {
                                        position: absolute;
                                        content: 'Country Code+number';
                                        color: red;
                                        font-size: 0.7rem;
                                        right: 0;
                                    }
                                }
                            }

                            .domestic-phone-num {
                                flex: 2;

                                :deep(.el-form-item__label) {
                                    color: white;
                                    position: relative;

                                    &::after {
                                        position: absolute;
                                        content: '國碼+電話號碼';
                                        color: red;
                                        font-size: 0.7rem;
                                        right: 0;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .reminder {
                font-size: 1rem;
                color: #666;
                margin-top: 20px;
                line-height: 1.5;

                p {
                    margin-bottom: 10px;
                }
            }

            .captcha-container {
                display: flex;
                width: 100%;
                gap: 1rem;

                @media screen and (max-width: 768px) {
                    flex-direction: column;
                    align-items: center;

                }

                el-input {
                    width: 60%;

                    @media screen and (max-width: 768px) {
                        width: 100%;
                    }
                }

                img {
                    cursor: pointer;
                    // width: 30%;

                    @media screen and (max-width: 768px) {
                        // width: 60%;
                    }
                }
            }

            .submit-btn {
                width: 100%;
                margin-top: 20px;
                background-color: #E87B86;
            }

            .warning-text {
                color: red;
                font-size: 0.9rem;
                margin-top: 10px;
            }
        }

        .agenda-box {
            width: 80%;
            margin: 0 auto;

            img {
                width: 100%;
                margin-bottom: 20px;
            }
        }

    }

}
</style>