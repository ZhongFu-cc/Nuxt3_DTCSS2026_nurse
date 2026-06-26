// stores/booking.ts (範例：當下報名流程的暫存資料)
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    // 當下操作所需的資料
    memberId: '',
  }),
  actions: {
    // 儲存當下輸入
    setMemberId(id: string) {
      this.memberId = id
    },
    // 流程結束或取消時，手動清空（可選）
    resetFlow() {
      this.$reset() // Pinia 內建直接重設所有狀態
    }
  }
})