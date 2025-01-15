import { ref } from 'vue';
import axios from 'axios';

/**
 * ファイルリスト取得用カスタムフック
 * @returns files: ファイルリスト, fetchFileList: ファイルリスト取得関数
 */
export function useProc() {
  const files = ref<string[]>([]); // リアクティブなファイルリスト
  const dirs = ref<any[]>([]); // リアクティブなディレクトリリスト

  /**
   * 指定URLからディレクトリリストを取得
   * @returns 
   */
  const fetchProc1List = async () => {
    try {
      const response = await axios.post('/fastapi/process/fast', {
        responseType: 'json',
      });
      // jsonレスポンスをjson文字列に変換
      const json = JSON.stringify(response.data);
      alert(json);
    } catch (error) {
      console.error('初回画像作成バッチ実行に失敗しました', error);
    }
  };

  /**
   * Deleteメソッドで/models/{model_id}にリクエストし、画像を削除する。
   * リクエストボディ(json)は以下の形式で送信する
   * {"file_name" : file_name}
   * レスポンスボディ(json)は以下の形式で返ってくる
   * {"model_id": model_id, "task id": result.id}
   * レスポンスステータスが200で、result.idが取得できなければエラーとする
   * メソッドレスポンスはbooleanを返し、エラーの場合はfalseを返す
   */
  const deleteImage = async (model_id: string, file_url: string) => {
    try {
      // file_nameは`http://192.168.10.85/sd/img/147921_0/147921_0_88nude_0_0.png`のような形式
      // 147921_0_88nude_0_0の部分だけ取得してリクエストボディに設定する必要がある。
      // そのため、スラッシュで分割して最後の要素を取得する
      // 拡張子も削除する
      const file_name = file_url?.split('/').pop()?.split('.').shift() ?? 'undefined';
      const response = await axios.delete('/fastapi/models/' + model_id, {
        responseType: 'json',
        data: {
          file_name: file_name
        }
      });
      // jsonレスポンスをjson文字列に変換
      const json = JSON.stringify(response.data);
      return json.includes('task_id');
    } catch (error) {
      console.error('画像削除に失敗しました', error);
      return false;
    }
  }

  // /**
  //  * 指定URLからディレクトリリストを取得
  //  * @param url ディレクトリ一覧のインデックスページURL
  //  * @returns 
  //  */
  // const fetchDirList = async (url: string) => {
  //   try {
  //     const response = await axios.get(url, {
  //       responseType: 'text', // HTMLのインデックスページを取得
  //     });
  //     // DOMParserでHTMLをパース
  //     const parser = new DOMParser();
  //     const doc = parser.parseFromString(response.data, 'text/html');

  //     // HTMLが正しくパースされているかチェック
  //     if (!doc.body) {
  //       console.error('HTMLのパースに失敗しました。');
  //       return;
  //     }

  //     // <a>要素をすべて取得
  //     const links = Array.from(doc.querySelectorAll('a'));

  //     // <a>タグが存在しない場合
  //     if (links.length === 0) {
  //       console.warn('リンクが見つかりませんでした。');
  //       return;
  //     }

  //     // ディレクトリ名をフィルタして抽出
  //     dirs.value = Array.from(links)
  //       .map((link) => link.getAttribute('href') || '')
  //       .filter((href) => href && !href.startsWith('?')) // クエリ文字列を除外
  //       .filter((href) => href.endsWith('/')) // ディレクトリのみ抽出
  //       .filter((href) => !href.startsWith('../')) // 親ディレクトリへのリンクを除外
  //       .map((href) => {
  //         // 最後のスラッシュを取る
  //         const dir_name = href.slice(0, -1);
  //         // パラメータurlを頭につけて絶対URLに変換
  //         //const absoluteUrl = new URL(href, url).toString();
  //         return {
  //           image_url: 'http://192.168.10.85' + url + href + 'thumbnail.png',
  //           model_id: dir_name
  //         };
  //       })
  //       // 降順に変更
  //       .reverse();
  //     //console.log('ディレクトリ一覧を取得しました', dirs.value);
  //   } catch (error) {
  //     console.error('ファイル一覧の取得に失敗しました', error);
  //   }
  // };

  // /**
  //  * 指定URLからファイルリストを取得
  //  * @param url ファイル一覧のインデックスページURL
  //  */
  // const fetchFileList = async (url: string) => {
  //   try {
  //     const response = await axios.get(url, {
  //       responseType: 'text', // HTMLのインデックスページを取得
  //     });
  //     // DOMParserでHTMLをパース
  //     const parser = new DOMParser();
  //     const doc = parser.parseFromString(response.data, 'text/html');

  //     // HTMLが正しくパースされているかチェック
  //     if (!doc.body) {
  //       console.error('HTMLのパースに失敗しました。');
  //       return;
  //     }

  //     // <a>要素をすべて取得
  //     const links = Array.from(doc.querySelectorAll('a'));

  //     // <a>タグが存在しない場合
  //     if (links.length === 0) {
  //       console.warn('リンクが見つかりませんでした。');
  //       return;
  //     }

  //     // // 各リンクのhrefとテキストを出力
  //     // links.forEach(link => {
  //     //   const textContent = link.textContent ? link.textContent.trim() : '';
  //     //   console.log(`Text: ${textContent}, Href: ${link.href}`);
  //     // });


  //     // ファイル名をフィルタして抽出
  //     files.value = Array.from(links)
  //       .map((link) => link.getAttribute('href') || '')
  //       .filter((href) => href && !href.startsWith('?')) // クエリ文字列を除外
  //       .filter((href) => !href.endsWith('/')) // ディレクトリを除外
  //       .filter((href) => !href.startsWith('../')) // 親ディレクトリへのリンクを除外
  //       .filter((href) => !href.endsWith('thumbnail.png')) // thumbnail.pngを除外
  //       .map((href) => {
  //         // パラメータurlを頭につけて絶対URLに変換
  //         //const absoluteUrl = new URL(href, url).toString();
  //         return 'http://192.168.10.85' + url + href;
  //       });

  //     //console.log('ファイル一覧を取得しました', files.value);
  //   } catch (error) {
  //     console.error('ファイル一覧の取得に失敗しました', error);
  //   }
  // };

  return {
    files,
    dirs,
    fetchProc1List,
    deleteImage,
    // fetchFileList,
    // fetchDirList
  };
}
