import { ref } from 'vue';
import axios from 'axios';

/**
 * ファイルリスト取得用カスタムフック
 * @returns files: ファイルリスト, fetchFileList: ファイルリスト取得関数
 */
export function useFileList() {
  const files = ref<string[]>([]); // リアクティブなファイルリスト
  const dirs = ref<any[]>([]); // リアクティブなディレクトリリスト

  /**
   * 指定URLからディレクトリリストを取得
   * @param url ディレクトリ一覧のインデックスページURL
   * @returns 
   */
  const fetchDirList = async (url: string) => {
    try {
      const response = await axios.get(url, {
        responseType: 'text', // HTMLのインデックスページを取得
      });
      // DOMParserでHTMLをパース
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data, 'text/html');

      // HTMLが正しくパースされているかチェック
      if (!doc.body) {
        console.error('HTMLのパースに失敗しました。');
        return;
      }

      // <a>要素をすべて取得
      const links = Array.from(doc.querySelectorAll('a'));

      // <a>タグが存在しない場合
      if (links.length === 0) {
        console.warn('リンクが見つかりませんでした。');
        return;
      }

      // ディレクトリ名をフィルタして抽出
      dirs.value = Array.from(links)
        .map((link) => link.getAttribute('href') || '')
        .filter((href) => href && !href.startsWith('?')) // クエリ文字列を除外
        .filter((href) => href.endsWith('/')) // ディレクトリのみ抽出
        .filter((href) => !href.startsWith('../')) // 親ディレクトリへのリンクを除外
        .map((href) => {
          // 最後のスラッシュを取る
          const dir_name = href.slice(0, -1);
          // パラメータurlを頭につけて絶対URLに変換
          //const absoluteUrl = new URL(href, url).toString();
          return {
            image_url: 'http://192.168.10.85' + url + href + 'thumbnail.png',
            model_id: dir_name
          };
        })
        // 降順に変更
        .reverse();
      //console.log('ディレクトリ一覧を取得しました', dirs.value);
    } catch (error) {
      console.error('ファイル一覧の取得に失敗しました', error);
    }
  };

  const fetchDirList2 = async (id: number) => {
    // 以下ファイルをキャッシュなしで取得する
    // idが0の場合は、/sd/json/list.json
    // idが1の場合は、/sd/json/yome_list.json
    // idが2の場合は、/sd/json/sub_list.json
    let url = '';
    switch (id) {
      case 0:
        url = '/sd/json/list.json';
        break;
      case 1:
        url = '/sd/json/yome_list.json';
        break;
      case 2:
        url = '/sd/json/sub_list.json';
        break;
      default:
        url = '/sd/json/list.json';
        break;
    }
    try {
      const response = await axios.get(url, {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
        params: {
          t: new Date().getTime(), // タイムスタンプを追加してキャッシュ回避
        },
      });
      // データをdirsにセット
      dirs.value = response.data;
      return response.data; // JSONデータを返す
    } catch (error) {
      console.error('Error fetching JSON:', error);
      throw error; // エラーを呼び出し元に伝える
    }
  };

  /**
   * 指定URLからファイルリストを取得
   * @param url ファイル一覧のインデックスページURL
   */
  const fetchFileList = async (url: string) => {
    try {
      const response = await axios.get(url, {
        responseType: 'text', // HTMLのインデックスページを取得
      });
      // DOMParserでHTMLをパース
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data, 'text/html');

      // HTMLが正しくパースされているかチェック
      if (!doc.body) {
        console.error('HTMLのパースに失敗しました。');
        return;
      }

      // <a>要素をすべて取得
      const links = Array.from(doc.querySelectorAll('a'));

      // <a>タグが存在しない場合
      if (links.length === 0) {
        console.warn('リンクが見つかりませんでした。');
        return;
      }

      // // 各リンクのhrefとテキストを出力
      // links.forEach(link => {
      //   const textContent = link.textContent ? link.textContent.trim() : '';
      //   console.log(`Text: ${textContent}, Href: ${link.href}`);
      // });


      // ファイル名をフィルタして抽出
      files.value = Array.from(links)
        .map((link) => link.getAttribute('href') || '')
        .filter((href) => href && !href.startsWith('?')) // クエリ文字列を除外
        .filter((href) => !href.endsWith('/')) // ディレクトリを除外
        .filter((href) => !href.startsWith('../')) // 親ディレクトリへのリンクを除外
        .filter((href) => !href.endsWith('thumbnail.png')) // thumbnail.pngを除外
        .map((href) => {
          // パラメータurlを頭につけて絶対URLに変換
          //const absoluteUrl = new URL(href, url).toString();
          return 'http://192.168.10.85' + url + href;
        });

      //console.log('ファイル一覧を取得しました', files.value);
    } catch (error) {
      console.error('ファイル一覧の取得に失敗しました', error);
    }
  };

  return {
    files,
    dirs,
    fetchFileList,
    fetchDirList,
    fetchDirList2
  };
}
