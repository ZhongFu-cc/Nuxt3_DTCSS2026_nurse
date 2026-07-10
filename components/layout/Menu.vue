<template>
    <ClientOnly>
        <div class="menu-container">

            <div class="logo-container">
                <nuxt-link class="logo-link" :to="localPath('/')">
                    <div class="logo-image-box">
                        <img class="logo" src="/img/logo.png" alt="DTCSS Logo" />
                    </div>
                </nuxt-link>
            </div>


            <div class="menu-box">
                <img class="translation-icon" src="@/assets/img/translation1.svg" alt="earth icon"
                    @click="translationMenuState.toggleMenu" />

                <div class="sub-menu-box last-sub-menu-box" v-if="translationMenuState.isOpen">
                    <el-button @click="setLang('zh')">繁體中文</el-button>
                    <el-button @click="setLang('en')">English</el-button>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>

const isLogin = useState('isLogin', () => false)

const localPath = useLocalePath()
const { t, setLocale } = useI18n()


const setLang = (lang: string) => {
    translationMenuState.value.isOpen = false;
    localStorage.setItem('lang', lang);
    setLocale(lang);
}



const translationMenuState = ref({
    isOpen: false,
    toggleMenu: () => {
        translationMenuState.value.isOpen = !translationMenuState.value.isOpen
    }
})




</script>
<style lang="scss" scoped>
.menu-container {
    background: linear-gradient(90deg, #0052d4 0%, #011144 15%, #150a21 100%);
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .logo-container {
        width: 30%;
        padding: 0.5rem 0;

        .logo-image-box {
            width: 25rem;
            height: 100%;

            .logo {
                width: 25rem;
                height: 100%;
                object-fit: contain;
            }
        }
    }

    .menu-box {
        width: 30%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;

        .translation-icon {
            width: 1.5rem;
            height: 1.5rem;
            cursor: pointer;
        }

        .sub-menu-box {
            position: absolute;
            top: 2.5rem;
            right: -3rem;
            background-color: white;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 1rem;
            border: #19254e solid 1px;
            border-radius: 8px;
            z-index: 1000;

            .el-button {
                color: #19254e;
                padding: 0.25rem 0.5rem;
                width: 100%;
                text-align: left;
                margin-left: 0;

                border: none;

                &:hover {
                    background-color: #1e2a6c;
                    color: white;
                }
            }
        }

    }
}
</style>