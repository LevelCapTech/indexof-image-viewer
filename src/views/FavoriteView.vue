<template>
  <div class="image-view">
    <img :src="image" alt="Image" class="image-slide" />
  </div>

  <div class="controls">
    <!-- 選択ボックス 1 -->
    <select v-model="selectedOption1" @change="onSelectChange1">
      <option v-for="option in options_princess" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    
    <!-- 選択ボックス 2 -->
    <select v-model="selectedOption2" @change="onSelectChange2">
      <option v-for="option in options_rank" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    
    <!-- 選択ボックス 3 -->
    <select v-model="selectedOption3" @change="onSelectChange3">
      <option v-for="option in options_appeal" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    
    <!-- ボタン -->
    <button @click="onClick">Click me</button>

    <!-- テキストエリア memo -->
    <textarea v-model="memo" placeholder="メモ" rows="4"></textarea>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useProc } from '../composables/useProc';
  const { favoriteImage } = useProc();
  const router = useRouter(); // vue-router をインポートして使用
  const route = useRoute();
  const model_id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

  // サムネイル画像
  const image = '/sd/img/' + model_id + '/thumbnail.png';

  // class ApiPromptItem(BaseModel):
  //   princess: bool  # 嫁フラグ
  //   rank: int # 嫁ランク
  //   appeal: int # 再現性
  //   memo: str

  // メモ
  const memo = ref('');

  // 選択ボックスのオプション
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  // 選択ボックスのオプション
  const options_princess = [
    { value: 0, label: '町娘' },
    { value: 1, label: '姫様' },
  ];

  // ランクのオプション
  const options_rank = [
    { value: 1, label: '(A)完璧再現性' },
    { value: 2, label: '(B)使用可能' },
    { value: 3, label: '(C)他のモデルでも使えるかも' },
    { value: 4, label: '(D)バイバイ' },
  ];
  // アピールのオプション
  const options_appeal = [
  { value: 11, label: 'A1:好きな子' },
  { value: 12, label: 'A2:レギュラー/リストに入れたい' },
  { value: 13, label: 'A3:目の色など少し相性が悪い' },
  { value: 21, label: 'B1:かわいい子（有名キャラ過ぎて...）' },
  { value: 22, label: 'B2:かわいい子（ちょっとタッチが...）' },
  { value: 23, label: 'B3:なんかタイプじゃない' },
  { value: 24, label: 'B4:服着てるんだよね' },
  { value: 25, label: 'B5:ちょっとタッチが古い' },
  { value: 26, label: 'B6:体型がダメかなぁ' },
  { value: 30, label: 'C1:審議' },
  { value: 31, label: 'C2:ぼけている・タッチが荒い' },
  { value: 32, label: 'C3:プロンプトは守れている' },
  { value: 33, label: 'C4:半分壊れている' },
  { value: 44, label: 'D1:ごめんね' },
];

  // 各選択ボックスの選択状態
  const selectedOption1 = ref(options[0].value);
  const selectedOption2 = ref(options[1].value);
  const selectedOption3 = ref(options[2].value);

  // 各選択ボックスの変更イベント
  const onSelectChange1 = () => {
    console.log('Selected Option 1:', selectedOption1.value);
  };

  const onSelectChange2 = () => {
    console.log('Selected Option 2:', selectedOption2.value);
  };

  const onSelectChange3 = () => {
    console.log('Selected Option 3:', selectedOption3.value);
  };

  // ボタンのクリックイベント
  const onClick = () => {
    console.log('onClick - Model ID:', model_id);
    // 結果がtrueの時のみemit('emit_delete', props.pkey);する
    favoriteImage(model_id, memo.value, selectedOption1.value == '1', parseInt(selectedOption2.value), parseInt(selectedOption3.value)).then((result) => {
      if (!result) {
        alert('登録に失敗しました');
      }
      router.push({
        name: 'Home',
      });
    });
  };

  // マウント時の処理（必要なら追加）
  onMounted(() => {
    console.log('Mounted');
  });
</script>

<style scoped>
.image-view {
  min-height: 75vh;
}

.image-slide {
  width: 75%;
  margin: 0 auto;
}

.controls {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px; /* 要素間の隙間 */
}

select,
button {
  width: 100%; /* 横幅100% */
  height: 50px;
  padding: 10px; /* 内側の余白 */
  font-size: 1rem;
  border: 1px solid #ccc; /* 枠線 */
  border-radius: 5px; /* 角を丸める */
  box-sizing: border-box; /* パディングを含む幅 */
}

button {
  background-color: #007bff; /* ボタンの背景色 */
  color: white; /* ボタンの文字色 */
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3; /* ホバー時の背景色 */
}
</style>
