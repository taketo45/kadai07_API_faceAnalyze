import { CameraModule } from './camera.js';
import { ImageAnalysisModule } from './imageAnalysis.js';
import { DisplayModule } from './displayUtils.js';
import { db } from './firebase.js';
import { AuthService } from './authService.js';

// メインの初期化と制御を管理するモジュール
const MainModule = {
    //初期化
    async init() {
        // 認証サービスの初期化とコールバックの設定 → カメラ初期化遅れの対策
        AuthService.init(async (user) => {
            if (user) {
                await CameraModule.init();
                this.setupEventListeners();
            }
        });
    },

    // イベントリスナーの設定
    setupEventListeners() {
        // 録画画面更新ボタン
        $('#updateButton').on('click', async () => {
            await CameraModule.reset();
            DisplayModule.resetPreview();
        });

        // 写真撮影ボタン
        $('#captureButton').on('click', () => {
            const imageData = CameraModule.captureImage();
            DisplayModule.updatePreview(imageData);
            
            // ダウンロードリンクの更新
            $('#download').attr('href', imageData);
            
            // 分析ボタンを有効化
            $('#analyzeButton').prop('disabled', false);
        });

        // 画像分析ボタン
        $('#analyzeButton').on('click', async () => {
            const imageData = $('#imagePreview').attr('src');
            try {
                const response = await ImageAnalysisModule.analyzeFaceAndEmotions(imageData);
                DisplayModule.displayResults(response);
            } catch (error) {
                console.error('Failed to analyze image:', error);
                alert('画像の分析に失敗しました: ' + error.message);
            }
        });
    }
};

// 初期化
$(async () => {
    try {
        await MainModule.init();
    } catch (error) {
        console.error('アプリケーションの初期化に失敗しました:', error);
        alert('アプリケーションの初期化に失敗しました: ' + error.message);
    }
});

export { MainModule };
