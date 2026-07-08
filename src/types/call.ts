// WebRTC sinyal tipleri — backend CallSignalType/DtoCallSignal ile birebir (tenant caller tarafı).

export type CallSignalType =
  | 'INCOMING_CALL'
  | 'RINGING'
  | 'ANSWERED'
  | 'CALL_TAKEN'
  | 'REJECTED'
  | 'CANCELLED'
  | 'HANGUP'
  | 'TIMEOUT'
  | 'UNAVAILABLE'
  | 'BUSY'
  | 'ERROR'
  | 'SDP'
  | 'ICE'

export interface CallSignal {
  type: CallSignalType
  callId: string | null
  peerUserId?: number | null
  peerDisplayName?: string | null
  ringAll?: boolean
  sdpType?: string | null
  sdp?: string | null
  candidate?: string | null
  sdpMid?: string | null
  sdpMLineIndex?: number | null
  reason?: string | null
}

export type TenantCallPhase = 'idle' | 'calling' | 'active'
