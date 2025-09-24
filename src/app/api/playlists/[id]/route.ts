import { NextRequest, NextResponse } from 'next/server';

// 쿠키에서 값 가져오는 헬퍼 함수
function getCookie(req: Request, name: string) {
    const header = req.headers.get("cookie") || "";
    const m = header.match(new RegExp(`${name}=([^;]+)`));
    return m ? decodeURIComponent(m[1]) : null;
}

// 토큰 갱신 함수
async function refreshAccessToken(refreshToken: string) {
    const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: process.env.SPOTIFY_CLIENT_ID!,
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
    });

    if (!response.ok) {
        throw new Error('Failed to refresh token');
    }

    return await response.json();
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // 쿠키에서 access_token 가져오기 (기존 API와 동일한 이름 사용)
    let accessToken = getCookie(request, 'sp_at');
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token not found' },
        { status: 401 }
      );
    }

    // Spotify API에서 플레이리스트 상세 정보 가져오기
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${id}?fields=id,name,description,images,owner,tracks(total,items(added_at,track(id,name,artists,album(id,name,images),duration_ms,explicit,preview_url,track_number,uri,external_urls))),followers,public,collaborative,external_urls,uri`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        // 토큰이 만료된 경우 갱신 시도
        const refreshToken = getCookie(request, 'sp_rt');
        if (refreshToken) {
          try {
            const tokenData = await refreshAccessToken(refreshToken);
            
            // 새로운 토큰으로 다시 시도
            const retryResponse = await fetch(
              `https://api.spotify.com/v1/playlists/${id}?fields=id,name,description,images,owner,tracks(total,items(added_at,track(id,name,artists,album(id,name,images),duration_ms,explicit,preview_url,track_number,uri,external_urls))),followers,public,collaborative,external_urls,uri`,
              {
                headers: {
                  'Authorization': `Bearer ${tokenData.access_token}`,
                  'Content-Type': 'application/json',
                },
              }
            );

            if (retryResponse.ok) {
              const playlistData = await retryResponse.json();
              const responseWithNewToken = NextResponse.json(playlistData);
              
              // 새로운 토큰을 쿠키에 저장
              responseWithNewToken.cookies.set("sp_at", tokenData.access_token, {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                maxAge: tokenData.expires_in ?? 3600,
              });
              
              return responseWithNewToken;
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
          }
        }
        
        return NextResponse.json(
          { error: 'Token expired' },
          { status: 401 }
        );
      }
      
      const errorText = await response.text();
      console.error('Spotify API error:', response.status, errorText);
      
      return NextResponse.json(
        { error: 'Failed to fetch playlist' },
        { status: response.status }
      );
    }

    const playlistData = await response.json();
    return NextResponse.json(playlistData);

  } catch (error) {
    console.error('Error fetching playlist:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
