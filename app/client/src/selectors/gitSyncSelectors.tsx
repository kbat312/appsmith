import { AppState } from "reducers";
import { createSelector } from "reselect";
import { GitSyncReducerState } from "reducers/uiReducers/gitSyncReducer";
import {
  getCurrentAppGitMetaData,
  getCurrentApplication,
} from "./applicationSelectors";
import { Branch } from "entities/GitSync";
import { ApplicationPayload } from "constants/ReduxActionConstants";

export const getGitSyncState = (state: AppState): GitSyncReducerState =>
  state.ui.gitSync;

export const getIsGitSyncModalOpen = (state: AppState) =>
  state.ui.gitSync.isGitSyncModalOpen;

export const getIsDisconnectGitModalOpen = (state: AppState) =>
  state.ui.gitSync.isDisconnectGitModalOpen;

export const getIsGitRepoSetup = (state: AppState) => {
  const gitMetadata = getCurrentAppGitMetaData(state);
  return gitMetadata?.remoteUrl;
};

export const getIsCommittingInProgress = (state: AppState) =>
  state.ui.gitSync.isCommitting;

export const getIsCommitSuccessful = (state: AppState) =>
  state.ui.gitSync.isCommitSuccessful;

export const getActiveGitSyncModalTab = (state: AppState) =>
  state.ui.gitSync.activeGitSyncModalTab;

export const getIsGitErrorPopupVisible = (state: AppState) =>
  state.ui.gitSync.isErrorPopupVisible;

export const getIsImportAppViaGitModalOpen = (state: AppState) =>
  state.ui.gitSync.isImportAppViaGitModalOpen;

export const getOrganizationIdForImport = (state: AppState) =>
  state.ui.gitSync.organizationIdForImport;

export const getGlobalGitConfig = (state: AppState) =>
  state.ui.gitSync.globalGitConfig;

export const getLocalGitConfig = (state: AppState) =>
  state.ui.gitSync.localGitConfig;

export const getIsLocalConfigDefined = createSelector(
  getLocalGitConfig,
  (localGitConfig) =>
    !!(localGitConfig.authorEmail || localGitConfig.authorName),
);

export const getIsGlobalConfigDefined = createSelector(
  getGlobalGitConfig,
  (globalGitConfig) =>
    !!(globalGitConfig.authorEmail || globalGitConfig.authorName),
);

export const getIsFetchingGlobalGitConfig = (state: AppState) =>
  state.ui.gitSync.isFetchingGitConfig;

export const getIsFetchingLocalGitConfig = (state: AppState) =>
  state.ui.gitSync.isFetchingLocalGitConfig;

export const getGitStatus = (state: AppState) => state.ui.gitSync.gitStatus;

export const getGitConnectError = (state: AppState) =>
  state.ui.gitSync.connectError?.error;

export const getGitPullError = (state: AppState) =>
  state.ui.gitSync.pullError?.error;

export const getGitMergeError = (state: AppState) =>
  state.ui.gitSync.mergeError?.error;

export const getGitCommitAndPushError = (state: AppState) =>
  state.ui.gitSync.commitAndPushError?.error;

export const getIsFetchingGitStatus = (state: AppState) =>
  state.ui.gitSync.isFetchingGitStatus;

export const getIsPullingProgress = (state: AppState) =>
  state.ui.gitSync.pullInProgress;

export const getIsFetchingMergeStatus = (state: AppState) =>
  state.ui.gitSync.isFetchingMergeStatus;

export const getMergeStatus = (state: AppState) => state.ui.gitSync.mergeStatus;

export const getIsGitConnected = createSelector(
  getCurrentAppGitMetaData,
  (gitMetaData) => !!(gitMetaData && gitMetaData.remoteUrl),
);
export const getGitBranches = (state: AppState) => state.ui.gitSync.branches;

export const getGitBranchNames = createSelector(getGitBranches, (branches) =>
  branches.map((branchObj) => branchObj.branchName),
);

export const getDefaultGitBranchName = createSelector(
  getGitBranches,
  (branches: Array<Branch>) =>
    branches.find((branchObj) => branchObj.default)?.branchName,
);

export const getFetchingBranches = (state: AppState) =>
  state.ui.gitSync.fetchingBranches;

export const getCurrentGitBranch = (state: AppState) => {
  const { gitApplicationMetadata } = getCurrentApplication(state) || {};
  return gitApplicationMetadata?.branchName;
};

export const getPullFailed = (state: AppState) => state.ui.gitSync.pullFailed;

export const getPullInProgress = (state: AppState) =>
  state.ui.gitSync.pullInProgress;

export const getIsMergeInProgress = (state: AppState) =>
  state.ui.gitSync.isMerging;
export const getTempRemoteUrl = (state: AppState) =>
  state.ui.gitSync.tempRemoteUrl;

export const getCountOfChangesToCommit = (state: AppState) => {
  const gitStatus = getGitStatus(state);
  const { modifiedPages = 0, modifiedQueries = 0 } = gitStatus || {};
  return modifiedPages + modifiedQueries;
};

export const getShouldShowRepoLimitError = (state: AppState) => {
  const curApp = state.ui.applications.currentApplication;
  const userOrgs = state.ui.applications.userOrgs;
  if (userOrgs) {
    const org: any = userOrgs.find((organizationObject: any) => {
      const { organization } = organizationObject;
      return organization.id === curApp?.organizationId;
    });

    const privateGitConnectedApps =
      org?.applications.filter((application: ApplicationPayload) => {
        return (
          application.gitApplicationMetadata &&
          application.gitApplicationMetadata.remoteUrl &&
          application.gitApplicationMetadata.branchName &&
          application.gitApplicationMetadata.repoName &&
          application.gitApplicationMetadata.isRepoPrivate
        );
      }) || [];
    return privateGitConnectedApps.length > 2;
  } else {
    return false;
  }
};

export const getShowRepoLimitErrorModal = (state: AppState) =>
  state.ui.gitSync.showRepoLimitErrorModal;

export const getDisconnectingGitApplication = (state: AppState) =>
  state.ui.gitSync.disconnectingGitApp;

export const getUseGlobalProfile = (state: AppState) =>
  state.ui.gitSync.useGlobalProfile;
