<template>
    <div class="login-form-box">
        <ClientOnly>
            <el-form label-position="top" :model="loginData" @submit.prevent="login">
            <el-form-item label="Email" required>
                <el-input v-model="loginData.email" :placeholder="t('enterEmail')"></el-input>
            </el-form-item>

            <el-form-item :label="t('captcha')" required>
                <div class="captcha-container">
                    <el-input v-model="loginData.verificationCode" :placeholder="t('captcha')"></el-input>
                    <img :src="verificationImage" alt="captcha" @click="getCaptcha">
                </div>
            </el-form-item>

            <el-form-item class="submit-box">
                <el-button type="primary" native-type="submit">{{ t('submit') }}</el-button>
            </el-form-item>
        </el-form>
        </ClientOnly>
    </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '~/store/userStore';

const { t } = useI18n();

interface LoginData {
    email: string;
    verificationKey: string;
    verificationCode: string;
}

const verificationImage = ref<string>('');

const loginData = reactive<LoginData>({
    email: '',
    verificationKey: '',
    verificationCode: ''
});

const getCaptcha = async () => {
    try {
        let res = await CSRrequest.get('/member/captcha');
        loginData.verificationKey = res.data.key;
        verificationImage.value = res.data.image;
    } catch (error) {
        console.error('Error fetching captcha:', error);
    }
};
const route = useRoute();
const login = async () => {
    try {
        let res = await CSRrequest.post('/member/login-only-email', {
            body: loginData
        });

        if (res.code !== 200) {
            ElNotification({
                title: t('error'),
                message: res.msg || t('loginFailed'),
                type: 'error',
            });
            getCaptcha(); // Refresh captcha on failure
            return;
        }
        const redirectPath = route.query.redirect as string || '/';

        localStorage.setItem('Authorization-member',`Bearer ${res.data.tokenValue}`);
        await navigateTo(redirectPath);
    } catch (error) {
        console.error('Error during login:', error);
    }
}

onMounted(() => {
    getCaptcha();
});
</script>

<style lang="scss" scoped>
.login-form-box {
    width: 40%;
    border: 1px solid #ccc;
    padding: 20px;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .captcha-container {
        display: flex;
        align-items: center;

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: flex-start;

            img {
                margin-left: 0;
                margin-top: 10px;
            }
        }

        img {
            margin-left: 10px;
            cursor: pointer;
        }
    }

    .submit-box {
        text-align: center;

        :deep(.el-form-item__content) {
            display: flex;
            justify-content: flex-end;

            @media (max-width: 768px) {
                justify-content: center;
            }
        }
    }
}
</style>
