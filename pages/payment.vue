<template>
    <div>
        <div v-html="ecPayForm" ref="ecPayFormRef" style="display: none;"></div>
    </div>
</template>
<script lang="ts" setup>
const route = useRoute()
const orderId = route.query.id;

const ecPayForm = ref<any>()
const ecPayFormRef = ref()

const fetchOrderInfo = async () => {
    try {
        const res = await CSRrequest.get('/orders/payment', {
            params: {
                id: orderId
            }
        });

        if (res.code != 200) {
            ElNotification({
                title: '獲取訂單資訊失敗',
                message: res.msg || '請稍後再試',
                type: 'error',
            });
            return;
        }

        ecPayForm.value = res.data;

        await nextTick();
        if (ecPayFormRef.value) {
            const formElement = ecPayFormRef.value.querySelector('form');
            if (formElement) {
                formElement.submit();
            } else {
                console.error('EC Pay form not found in the response.');
            }
        }
    } catch (error) {
        console.error('Error fetching order info:', error);
    }
}

onMounted(() => {
    fetchOrderInfo();
})
</script>
<style lang="scss" scoped></style>