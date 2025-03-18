/**
 * 임시 사용자 식별자를 생성하고 관리하는 유틸리티
 * 로컬 스토리지를 사용하여 사용자 식별자를 저장하고 관리합니다.
 */

// 로컬 스토리지 키 상수
const USER_ID_KEY = 'my-skin-metrix-user-id';
const USER_CREATED_AT_KEY = 'my-skin-metrix-created-at';

/**
 * 무작위 UUID를 생성합니다.
 * @returns {string} 생성된 UUID
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * 사용자의 임시 ID를 가져옵니다. 없으면 새로 생성합니다.
 * @returns {string} 사용자 ID
 */
export function getUserId(): string {
  // 클라이언트 사이드에서만 실행
  if (typeof window === 'undefined') {
    return '';
  }

  let userId = localStorage.getItem(USER_ID_KEY);
  
  // 사용자 ID가 없으면 새로 생성하고 저장
  if (!userId) {
    userId = generateUUID();
    localStorage.setItem(USER_ID_KEY, userId);
    localStorage.setItem(USER_CREATED_AT_KEY, Date.now().toString());
  }
  
  return userId;
}

/**
 * 사용자 ID 생성 시간을 가져옵니다.
 * @returns {number | null} 생성 시간 타임스탬프 또는 null
 */
export function getUserCreatedAt(): number | null {
  // 클라이언트 사이드에서만 실행
  if (typeof window === 'undefined') {
    return null;
  }

  const createdAt = localStorage.getItem(USER_CREATED_AT_KEY);
  return createdAt ? parseInt(createdAt, 10) : null;
}

/**
 * 사용자 ID가 있는지 확인합니다.
 * @returns {boolean} 사용자 ID 존재 여부
 */
export function hasUserId(): boolean {
  // 클라이언트 사이드에서만 실행
  if (typeof window === 'undefined') {
    return false;
  }
  
  return !!localStorage.getItem(USER_ID_KEY);
}

/**
 * 사용자 ID를 재설정합니다.
 */
export function resetUserId(): void {
  // 클라이언트 사이드에서만 실행
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_CREATED_AT_KEY);
}

/**
 * 사용자 데이터를 로컬 스토리지에 저장합니다.
 * @param {string} key 저장 키
 * @param {any} data 저장할 데이터
 */
export function storeUserData(key: string, data: any): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(`my-skin-metrix-${key}`, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to store user data:', error);
  }
}

/**
 * 사용자 데이터를 로컬 스토리지에서 가져옵니다.
 * @param {string} key 저장 키
 * @returns {any} 저장된 데이터 또는 null
 */
export function getUserData<T>(key: string): T | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const data = localStorage.getItem(`my-skin-metrix-${key}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to get user data:', error);
    return null;
  }
} 