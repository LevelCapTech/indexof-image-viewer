<template>

  <!-- モデル名 -->
  <h1><a :href="civital_harf" target="_blank">{{ model_name }}</a></h1>

  <div class="image-view">
    <img :src="image" alt="Image" class="image-slide" />
  </div>

  <!-- baseImageListを画像表示 -->
  <div  v-for="baseImage in baseImageList">
    <img  v-if="baseImage" :src="baseImage" alt="Image" class="image-slide" />
  </div>
  
  <!-- プロンプト情報 -->
  <pre>{{ json }}</pre>

  <div class="controls">
    <!-- 短縮操作用のボタン:ボタンの色を変える -->
    <button @click="onClickA1" class="yellow">A1:姫様</button>
    <button @click="onClickA2" class="blue">A2:レギュラー(リスト入り)</button>
    <button @click="onClickA3" class="green">A3:保留</button>

    <hr>

    <button @click="onClickB2" class="orange">B2:かわいい子（リスト外）</button>

    <hr>

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

    <!-- ブラウザバックボタン -->
    <button @click="router.back()">Back</button>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useProc } from '../composables/useProc';
  const { favoriteImage,fetchModelName,fetchPromptJson } = useProc();
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
  const model_name = ref('');
  const civital_harf = ref('');
  // json文字列
  const json = ref('');

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

  const onClickA1 = () => {
    selectedOption1.value = '1';
    selectedOption2.value = '1';
    selectedOption3.value = '11';
    // onClickを着火
    onClick();
  };

  const onClickA2 = () => {
    selectedOption1.value = '0';
    selectedOption2.value = '1';
    selectedOption3.value = '12';
    onClick();
  };

  const onClickA3 = () => {
    selectedOption1.value = '0';
    selectedOption2.value = '1';
    selectedOption3.value = '13';
    onClick();
  };

  const onClickB2 = () => {
    selectedOption1.value = '0';
    selectedOption2.value = '2';
    selectedOption3.value = '22';
    onClick();
  };

  // ボタンのクリックイベント
  const onClick = () => {
    console.log('onClick - Model ID:', model_id);
    // 結果がtrueの時のみemit('emit_delete', props.pkey);する
    favoriteImage(model_id, memo.value, selectedOption1.value == '1', parseInt(selectedOption2.value), parseInt(selectedOption3.value)).then((result) => {
      if (!result) {
        alert('登録に失敗しました');
      }
      // セッションストレージにmodel_id(save_model_id)を保存
      sessionStorage.setItem('save_model_id', model_id);
      // セッションストレージからmodel_idを削除
      sessionStorage.removeItem('model_id');
      router.push({
        name: 'Home',
      });
    });
  };

  const checkImage = async (id: string) => {
    const url1 = '/cimg/' + id +'.jpeg';
    const response = await fetch(url1, { method: "HEAD" });
    return response.ok ? url1 : '';
  };

  const baseImageList = ref<string[]>([]);
  // model_idの_以降を削除してcheckImageを実行する
  for (let i = 0; i < 3; i++) {
    const harfModelId = model_id.split('_').shift() ?? '';
    checkImage(harfModelId + '_' + i).then((url) => {
      if (url) {
        baseImageList.value.push(url);
      }
    });
  }

  // マウント時の処理（必要なら追加）
  onMounted(() => {
    console.log('Mounted');
    // モデル名を取得する
    fetchModelName(model_id).then((result) => {
      model_name.value = result;
    });
    const harfModelId = model_id.split('_').shift() ?? '';
    civital_harf.value = "https://civitai.com/models/" + harfModelId + "/";
    // プロンプト情報を取得する
    fetchPromptJson(model_id).then((result) => {
      json.value = JSON.stringify(result, null, 2);
    });
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

button.yellow {
  background-color: #ffd75e;
  color: #323232;
}

button.blue {
  background-color: #007bff;
}

button.green {
  background-color: #28a745;
}

button.orange {
  background-color: #ff9640;
  color: #323232;
}


</style>
