import { LitElement, html, customElement, property, PropertyValues } from 'lit-element';
import { cssify } from '../../../utils/css';
import styles from './game-summary.scss';
import cloud from '@rivet-gg/cloud';
import global from '../../../utils/global';
import utils from '../../../utils/utils';
import routes from '../../../routes';
import * as api from '../../../utils/api';
import fileSize from '../../../utils/files';
import { FileInput, PrepareResponse } from '../../common/file-uploader';
import logging from '../../../utils/logging';

enum UploadType {
	Logo,
	Banner
}

@customElement('page-dev-game-summary')
export default class DevGameSummary extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull = null;

	@property({ type: Object })
	groupProfile: api.group.GroupProfile = null;

	// === EVENT HANDLERS ===
	groupStream?: api.RepeatingRequest<void>;

	async firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		let res = await global.live.group.getGroupProfile({ groupId: this.game.developerGroupId });
		this.groupProfile = res.group;
	}

	render() {
		return html`
			<div id="base">
				${this.groupProfile
					? html`
							<div id="group-card">
								<div id="group-handle">
									<h2>${this.groupProfile.displayName}</h2>
									<avatar-collage
										size="30"
										max="5"
										.identities=${this.groupProfile.members.map(a => a.identity)}
									></avatar-collage>
								</div>

								<stylized-button
									href=${routes.group.build({ id: this.game.developerGroupId })}
									>Profile</stylized-button
								>
								<stylized-button
									href=${routes.groupBilling.build({
										groupId: this.groupProfile.id
									})}
									>Billing</stylized-button
								>
							</div>
					  `
					: html`<loading-placeholder id="group-card-placeholder"></loading-placeholder>`}
				<h1>Basic Info</h1>
				<div id="input-area">
					<div class="not-allowed">
						<div class="disabled">
							<h3>Game Title</h3>
							<text-input
								placeholder="Enter a game title here"
								.init=${this.game.displayName}
							></text-input>
							<!-- <h3>Description</h3>
								<text-input
									id="description"
									area
									maxlength="256"
									placeholder="Enter a game description here"
								></text-input>
								<h3>Tags</h3>
								<text-input placeholder="Enter game tags here"></text-input> -->
						</div>
					</div>
					<h3>Logo</h3>
					<file-uploader
						id="logo-input"
						max-size=${fileSize.megabytes(2)}
						.accept=${'image/png, image/jpeg'}
						.allowed=${/\.(png|jpe?g)$/i}
						.prepareUpload=${this.prepareUpload.bind(this, UploadType.Logo)}
						.completeUpload=${this.completeUpload.bind(this, UploadType.Logo)}
					>
						<e-svg slot="icon" src="regular/file-arrow-up"></e-svg>
						<div slot="content">
							<p class="file-input-title">Upload Game Logo</p>
							<p class="file-input-subtitle">Recommended size 640px by 640px</p>
						</div>
					</file-uploader>
					<h3>Banner</h3>
					<file-uploader
						id="banner-input"
						max-size=${fileSize.megabytes(4)}
						.accept=${'image/png, image/jpeg'}
						.allowed=${/\.(pn|jpe?)g$/i}
						.prepareUpload=${this.prepareUpload.bind(this, UploadType.Banner)}
						.completeUpload=${this.completeUpload.bind(this, UploadType.Banner)}
					>
						<e-svg slot="icon" src="regular/file-arrow-up"></e-svg>
						<div slot="content">
							<p class="file-input-title">Upload Game Banner</p>
							<p class="file-input-subtitle">Recommended size at least 1920px by 1080px</p>
						</div>
					</file-uploader>
					<!-- <h3>Video background</h3>
						<file-uploader video id="video-input">
							<e-svg slot="icon" src="regular/file-video"></e-svg>
							<div slot="content">
								<p class="file-input-title">Upload Video Background</p>
								<p class="file-input-subtitle">Maximum file size 12.5MB</p>
							</div>
						</file-uploader> -->
				</div>
			</div>
		`;
	}

	async prepareUpload(type: UploadType, files: FileInput[]): Promise<PrepareResponse> {
		let imageFile = files[0];
		if (!imageFile) {
			logging.warn('no image file provided');
			return null;
		}

		// Prepare the upload
		let createRes;
		if (type == UploadType.Logo) {
			createRes = await global.cloud.gameLogoUploadPrepare({
				gameId: this.game.id,
				path: imageFile.prepared.path,
				mime: imageFile.prepared.contentType,
				contentLength: imageFile.prepared.contentLength
			});
		} else if (type == UploadType.Banner) {
			createRes = await global.cloud.gameBannerUploadPrepare({
				gameId: this.game.id,
				path: imageFile.prepared.path,
				mime: imageFile.prepared.contentType,
				contentLength: imageFile.prepared.contentLength
			});
		}

		return {
			uploadId: createRes.uploadId,
			files: [
				{
					presignedRequest: createRes.presignedRequest,
					input: imageFile
				}
			]
		};
	}

	async completeUpload(type: UploadType, prepareRes: PrepareResponse) {
		if (type == UploadType.Logo) {
			await global.cloud.gameLogoUploadComplete({
				gameId: this.game.id,
				uploadId: prepareRes.uploadId
			});
		} else if (type == UploadType.Banner) {
			await global.cloud.gameBannerUploadComplete({
				gameId: this.game.id,
				uploadId: prepareRes.uploadId
			});
		}
	}
}
